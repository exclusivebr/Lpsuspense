/**
 * Integração com a Wiven (Pix) — https://app.wiven.com.br/docs/v1
 * Variáveis: WIVEN_PUBLIC_KEY e WIVEN_SECRET_KEY (painel Wiven > Integrações > API).
 *
 * Fluxo: criamos a cobrança Pix com callbackUrl fixo (/api/webhook/wiven). A Wiven avisa quando
 * o Pix é pago (TRANSACTION_PAID). A consulta direta à transação é usada só como reserva,
 * no máximo 1 vez por minuto, porque a Wiven bloqueia polling frequente.
 */

const API = process.env.WIVEN_API_URL || "https://app.wiven.com.br/api/v1";

export function wivenConfigured() {
  return !!(process.env.WIVEN_PUBLIC_KEY && process.env.WIVEN_SECRET_KEY);
}

async function wiven<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      "x-public-key": process.env.WIVEN_PUBLIC_KEY ?? "",
      "x-secret-key": process.env.WIVEN_SECRET_KEY ?? "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Wiven ${res.status}: ${text.slice(0, 400)}`);
  return JSON.parse(text) as T;
}

export type WivenPix = {
  transactionId: string;
  webhookToken?: string;
  code: string;
  image?: string;
  expiresAt?: string;
};

export async function criarPix(opts: {
  ref: string;
  valor: number;
  produto: string;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  baseUrl: string;
}): Promise<WivenPix> {
  const res = await wiven<{
    transactionId: string;
    status: string;
    webhookToken?: string;
    pix?: { code?: string; image?: string; expiresAt?: string };
    errorDescription?: string;
  }>("/gateway/pix/receive", {
    method: "POST",
    body: JSON.stringify({
      identifier: opts.ref,
      amount: opts.valor,
      client: { name: opts.nome, email: opts.email, phone: opts.telefone, ...(opts.cpf ? { document: opts.cpf } : {}) },
      products: [{ id: "missao-pmesp", name: opts.produto, quantity: 1, price: opts.valor }],
      metadata: { provider: "missao-pmesp", orderId: opts.ref },
      callbackUrl: `${opts.baseUrl}/api/webhook/wiven`,
    }),
  });
  if (!res.pix?.code || ["FAILED", "REJECTED", "CANCELED"].includes(res.status)) {
    throw new Error(`Wiven recusou a cobrança: ${res.status} ${res.errorDescription ?? ""}`);
  }
  return {
    transactionId: res.transactionId,
    webhookToken: res.webhookToken,
    code: res.pix.code,
    image: res.pix.image,
    expiresAt: res.pix.expiresAt,
  };
}

export type WivenStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CHARGED_BACK" | "EXPIRED";

export async function consultarTransacao(transactionId: string) {
  return wiven<{ id: string; clientIdentifier: string; status: WivenStatus; amount: number }>(
    `/gateway/transactions?id=${encodeURIComponent(transactionId)}`,
  );
}
