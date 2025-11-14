"use client";

import { useState } from "react";

export default function ContactActions({
  phone,
  contactText,
}: {
  phone: string | null;
  contactText: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contactText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Nuk u kopjua dot:", err);
    }
  }

  const hasPhone = !!phone;

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        marginTop: 4,
      }}
    >
      {/* Copy */}
      <button
        type="button"
        onClick={handleCopy}
        style={{
          padding: "9px 12px",
          borderRadius: 999,
          border: "none",
          background: "#e0f2fe",
          color: "#0f172a",
          fontSize: 14,
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        {copied ? "Kopjuar ✅" : "Copy kontaktin"}
      </button>

      {/* Telefononi */}
      <button
        type="button"
        disabled={!hasPhone}
        onClick={() => {
          if (hasPhone) {
            window.location.href = `tel:${phone}`;
          }
        }}
        style={{
          padding: "9px 12px",
          borderRadius: 999,
          border: "none",
          background: hasPhone ? "#22c55e" : "rgba(148,163,184,0.4)",
          color: "white",
          fontSize: 14,
          cursor: hasPhone ? "pointer" : "default",
          fontWeight: 500,
        }}
      >
        Telefononi
      </button>

      {/* WhatsApp */}
      <button
        type="button"
        disabled={!hasPhone}
        onClick={() => {
          if (hasPhone) {
            window.open(`https://wa.me/${phone}`, "_blank");
          }
        }}
        style={{
          padding: "9px 12px",
          borderRadius: 999,
          border: "none",
          background: hasPhone ? "#16a34a" : "rgba(148,163,184,0.4)",
          color: "white",
          fontSize: 14,
          cursor: hasPhone ? "pointer" : "default",
          fontWeight: 500,
        }}
      >
        WhatsApp
      </button>

      <p
        style={{
          fontSize: 11,
          marginTop: 4,
          opacity: 0.75,
        }}
      >
        * Nëse nuk shfaqet telefoni, mund të përdorësh butonin “Copy kontaktin”
        dhe ta ngjitësh kontaktin ku dëshiron.
      </p>
    </div>
  );
}
