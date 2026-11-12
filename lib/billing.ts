import { getPurchase, savePurchase, type Purchase } from "./accounts";
import { findApprovedPayment, getPayment, mercadoPagoConfigured, productPrice, type MpPayment } from "./payments";
import { consultarTransacao, wivenConfigured, type WivenStatus } from "./wiven";

function applyPayment(p: Purchase, pay: MpPayment): Purchase {
  if (pay.status === "approved") {
    return {
      ...p,
      status: "approved",
      paymentId: String(pay.id),
      amount: pay.transaction_amount,
      approvedAt: p.approvedAt ?? new Date().toISOString(),
    };
  }
  if (["rejected", "cancelled", "refunded", "charged_back"].includes(pay.status)) {
    return { ...p, status: "rejected", paymentId: String(pay.id) };
  }
  return p;
}

/** Consulta o Mercado Pago e atualiza o status da compra (usado na página de obrigado). */
export async function syncPurchase(p: Purchase): Promise<Purchase> {
  if (p.status === "approved") return p;
  if (p.source === "wiven") return syncWiven(p);
  if (!mercadoPagoConfigured() || p.source !== "mercadopago") return p;
  const pay = await findApprovedPayment(p.ref).catch(() => null);
  if (!pay) return p;
  const next = applyPayment(p, pay);
  if (next.status !== p.status) await savePurchase(next);
  return next;
}

/** Recebe a notificação do Mercado Pago: busca o pagamento na API (fonte confiável) e atualiza a compra. */
export async function handlePaymentNotification(paymentId: string) {
  const pay = await getPayment(paymentId);
  if (!pay.external_reference) return;
  const p = await getPurchase(pay.external_reference);
  if (!p || p.status === "approved") return;
  const next = applyPayment(p, pay);
  if (next.status !== p.status) await savePurchase(next);
}

/* ---------------- Wiven ---------------- */

function applyWiven(p: Purchase, status: WivenStatus, valor?: number): Purchase {
  if (status === "COMPLETED") {
    // Confere o valor pago (tolerância de centavos) antes de liberar.
    if (typeof valor === "number" && valor + 0.01 < (p.amount ?? productPrice())) return p;
    return { ...p, status: "approved", approvedAt: p.approvedAt ?? new Date().toISOString() };
  }
  if (["FAILED", "REFUNDED", "CHARGED_BACK", "EXPIRED"].includes(status)) return { ...p, status: "rejected" };
  return p;
}

/**
 * Reserva caso o aviso (webhook) atrase: consulta a transação na Wiven no máximo 1 vez por minuto
 * e só depois de 1 minuto da criação, para não cair no bloqueio de polling da Wiven.
 */
async function syncWiven(p: Purchase): Promise<Purchase> {
  if (!wivenConfigured() || !p.pix?.transactionId || p.status !== "pending") return p;
  const now = Date.now();
  if (now - Date.parse(p.createdAt) < 60_000) return p;
  if (p.checkedAt && now - Date.parse(p.checkedAt) < 60_000) return p;
  const checked = { ...p, checkedAt: new Date().toISOString() };
  const tx = await consultarTransacao(p.pix.transactionId).catch(() => null);
  const next = tx && tx.clientIdentifier === p.ref ? applyWiven(checked, tx.status, tx.amount) : checked;
  await savePurchase(next);
  return next;
}

export type WivenWebhook = {
  event?: string;
  token?: string;
  transaction?: { id?: string; identifier?: string; status?: WivenStatus; amount?: number };
};

/** Processa o aviso da Wiven. Retorna false se o token não confere (notificação falsa). */
export async function handleWivenWebhook(body: WivenWebhook): Promise<boolean> {
  const ref = body.transaction?.identifier ?? "";
  const p = await getPurchase(ref);
  if (!p || p.source !== "wiven" || !p.pix) return false;
  const esperado = p.pix.webhookToken || process.env.WIVEN_WEBHOOK_TOKEN;
  if (!esperado || !body.token || !safeEqual(body.token, esperado)) return false;
  if (body.transaction?.id && body.transaction.id !== p.pix.transactionId) return false;
  if (p.status === "approved" && body.event !== "TRANSACTION_REFUNDED" && body.event !== "TRANSACTION_CHARGED_BACK") return true;

  const status: WivenStatus | undefined =
    body.event === "TRANSACTION_PAID" ? "COMPLETED"
    : body.event === "TRANSACTION_CANCELED" ? "FAILED"
    : body.event === "TRANSACTION_REFUNDED" ? "REFUNDED"
    : body.event === "TRANSACTION_CHARGED_BACK" ? "CHARGED_BACK"
    : body.transaction?.status;
  if (!status) return true;
  const next = applyWiven(p, status, body.transaction?.amount);
  if (next.status !== p.status) await savePurchase(next);
  return true;
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
