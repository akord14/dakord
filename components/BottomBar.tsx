"use client";

import Link from "next/link";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP || "";

function waLink() {
  const num = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  return num ? `https://wa.me/${num}` : "https://wa.me/";
}

function Item({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "flex flex-col items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <div className="flex h-6 w-6 items-center justify-center">
  {icon}
</div>

        <div className="leading-none">{label}</div>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <div className="flex h-6 w-6 items-center justify-center">
  {icon}
</div>
      <div className="leading-none">{label}</div>
    </Link>
  );
}

export default function BottomBar() {
  return (
    <div className="mt-8 w-full">
      <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
        <div className="grid grid-cols-5">
          <Item
            href="/"
            label="Home"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <Item
            href="/services"
            label="Shërbime"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
  <path
    d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  />
  <path
    d="M4 8h16v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
  <path
    d="M8 12h8"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  />
</svg>

            }
          />

          <Item
            href={waLink()}
            label="WhatsApp"
            external
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M20 11.6c0 4.6-3.8 8.4-8.4 8.4-1.4 0-2.8-.3-4-.9L4 20l.9-3.5c-.6-1.2-.9-2.5-.9-3.9C4 7.9 7.8 4 12.4 4S20 7 20 11.6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 9.2c.2-.4.5-.4.8-.2l.9.9c.2.2.2.5.1.7l-.3.5c-.1.2-.1.5.1.7.6.8 1.4 1.5 2.2 2 .2.1.5.1.7 0l.5-.3c.2-.1.5-.1.7.1l.9.9c.2.2.2.6-.1.8-.6.5-1.4.8-2.2.6-1.6-.4-3.1-1.7-4.2-2.9-1.1-1.2-2.1-2.8-2-4.3 0-.8.3-1.6.9-2.1Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            }
          />

          <Item
            href="/offering"
            label="Punësim"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
  <path
    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
    stroke="currentColor"
    strokeWidth="1.8"
  />
  <path
    d="M4 21a8 8 0 0 1 16 0"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  />
</svg>

            }
          />

          <Item
            href="/about"
            label="Rreth Nesh"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
  <circle
    cx="12"
    cy="12"
    r="9"
    stroke="currentColor"
    strokeWidth="1.8"
  />
  <path
    d="M12 10v6"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  />
  <circle
    cx="12"
    cy="7"
    r="1"
    fill="currentColor"
  />
</svg>

            }
          />
        </div>
      </div>
    </div>
  );
}
