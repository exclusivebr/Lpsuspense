"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pending, className = "pm-btn pm-btn-gold pm-btn-block" }: { children: React.ReactNode; pending?: string; className?: string }) {
  const { pending: isPending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={isPending}>
      {isPending ? (pending ?? "Aguarde…") : children}
    </button>
  );
}
