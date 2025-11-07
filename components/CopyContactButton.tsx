"use client";

import { useState } from "react";

export default function CopyContactButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 active:scale-[0.99]"
      aria-label="Kopjo kontaktin"
    >
      {copied ? "U kopjua ✅" : "Kopjo kontaktin"}
    </button>
  );
}
