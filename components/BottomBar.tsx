"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP || "";

function waLink() {
  const num = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  return num ? `https://wa.me/${num}` : "https://wa.me/";
}

type Tone = "blue" | "green" | "orange" | "slate";

function toneClasses(tone: Tone, active?: boolean) {
  // Strong icons/text; tint background in active pill
  switch (tone) {
    case "green":
      return active
        ? "text-emerald-700"
        : "text-emerald-600 hover:text-emerald-700";
    case "orange":
      return active
        ? "text-orange-700"
        : "text-orange-600 hover:text-orange-700";
    case "slate":
      return active ? "text-slate-800" : "text-slate-700 hover:text-slate-900";
    case "blue":
    default:
      return active ? "text-[#0b2a43]" : "text-[#0b2a43]/80 hover:text-[#0b2a43]";
  }
}

function pillBg(tone: Tone) {
  switch (tone) {
    case "green":
      return "bg-emerald-500/10 ring-1 ring-emerald-500/15";
    case "orange":
      return "bg-orange-500/10 ring-1 ring-orange-500/15";
    case "slate":
      return "bg-slate-900/5 ring-1 ring-black/10";
    case "blue":
    default:
      return "bg-[#0b2a43]/10 ring-1 ring-[#0b2a43]/15";
  }
}

function Item({
  href,
  label,
  icon,
  external,
  active,
  tone = "blue",
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  active?: boolean;
  tone?: Tone;
}) {
  const base =
    "flex flex-col items-center justify-center gap-1 px-2 py-2 text-[11px] font-semibold transition";
  const textCls = toneClasses(tone, active);

  const inner =
    "flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition";

  const activeBox = active
    ? `${pillBg(tone)} shadow-[0_10px_24px_rgba(15,23,42,0.08)]`
    : "bg-transparent";

  const iconCls = active ? "" : "opacity-95";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${textCls}`}
      >
        <div className={`${inner} ${activeBox}`}>
          <div className={`flex h-6 w-6 items-center justify-center ${iconCls}`}>
            {icon}
          </div>
          <div className="leading-none whitespace-nowrap">{label}</div>
        </div>
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${textCls}`}>
      <div className={`${inner} ${activeBox}`}>
        <div className={`flex h-6 w-6 items-center justify-center ${iconCls}`}>
          {icon}
        </div>
        <div className="leading-none whitespace-nowrap">{label}</div>
      </div>
    </Link>
  );
}

export default function BottomBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="mt-6 w-full">
      {/* Tint background (premium light) */}
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b2a43]/10 via-white/75 to-[#1f5b8f]/10 shadow-sm ring-1 ring-white/50 backdrop-blur">
        <div className="grid grid-cols-5 px-2 py-2">
          <Item
            href="/"
            label="Home"
            active={isActive("/")}
            tone="blue"
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
            active={isActive("/services")}
            tone="blue"
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
            // WhatsApp stays green even when not "active"
            tone="green"
            active={false}
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
            active={isActive("/offering")}
            tone="orange"
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
            active={isActive("/about")}
            tone="slate"
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
                <circle cx="12" cy="7" r="1" fill="currentColor" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
