"use client";

type Props = {
  contact: string;
};

export default function ContactActions({ contact }: Props) {
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
        href={`https://wa.me/${contact.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full bg-green-500 text-white text-sm hover:bg-green-600"
      >
        WhatsApp
      </a>
    </div>
  );
}
