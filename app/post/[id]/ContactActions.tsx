"use client";

import { useState } from "react";

type ContactActionsProps = {
  contact: string;
};

export default function ContactActions({ contact }: ContactActionsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (!navigator?.clipboard) return;
      await navigator.clipboard.writeText(contact);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Nuk u kopjua kontakti:", err);
    }
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-gray-50 transition"
      >
        Kopjo kontaktin
      </button>

      <span className="text-xs text-gray-500 min-h-[1rem]">
        {copied ? "Kontakti u kopjua ✅" : ""}
      </span>
    </div>
  );
}
