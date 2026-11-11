"use client";

export default function PrintButton({ label = "Baixar relatório (PDF)" }: { label?: string }) {
  return (
    <button type="button" className="pm-btn pm-btn-ghost pm-no-print" onClick={() => window.print()}>
      {label}
    </button>
  );
}
