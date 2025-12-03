"use client";

type Props = {
  contact: string;
};

export default function ContactActions({ contact }: Props) {
  // 1️⃣ Heq çdo karakter që s’është numër
  const clean = contact.replace(/\D/g, "");

  // 2️⃣ Nëse fillon me 0 → e konvertojmë në formatin shqiptar +355
  const whatsappNumber =
    clean.startsWith("0") ? `355${clean.slice(1)}` : clean;

  const handleCopy = () => {
    navigator.clipboard.writeText(contact);
    alert("Kontakti u kopjua!");
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={handleCopy}
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        Kopjo kontaktin
      </button>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full bg-green-500 text-white text-sm hover:bg-green-600"
      >
        WhatsApp
      </a>
    </div>
  );
}
