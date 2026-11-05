// Meta Pixel — ID público (pode ser trocado pela variável NEXT_PUBLIC_META_PIXEL_ID).
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1635631151305177";

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (typeof window === "undefined") return null;
  return ((window as unknown as { fbq?: Fbq }).fbq) ?? null;
}

/** Dispara o evento Lead no navegador. O eventID é o mesmo enviado pelo servidor (API de Conversões) para a Meta deduplicar. */
export function trackLead(eventId: string) {
  fbq()?.("track", "Lead", { content_name: "Lista Arquivo 00X", content_category: "trafego-pago" }, { eventID: eventId });
}

export function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
