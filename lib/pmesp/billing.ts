import { getPurchase, savePurchase, type Purchase } from "./accounts";
import { findApprovedPayment, getPayment, mercadoPagoConfigured, type MpPayment } from "./payments";

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
  if (p.status === "approved" || !mercadoPagoConfigured() || p.source !== "mercadopago") return p;
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
