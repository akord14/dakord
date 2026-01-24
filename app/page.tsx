// app/page.tsx
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-[#f7f8fb]">
        <div className="w-full px-4 pb-3 pt-3 sm:px-6 sm:pt-6 sm:pb-8 lg:px-10 2xl:px-16">

          {/* HERO – Premium polish (NO subtitle) */}
          <section className="relative">
            {/* subtle top brand wash (Mixed palette C) */}
            <div className="pointer-events-none absolute inset-x-0 -top-6 h-40 rounded-3xl bg-gradient-to-b from-[#0b2a43]/10 to-transparent" />

            <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
              <div className="px-5 py-6 sm:px-6 sm:py-7">
                <h1 className="text-center text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Gjej shërbimin
                </h1>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#1f5b8f] to-[#174a74] px-3 py-3 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(31,91,143,0.25)] ring-1 ring-white/20 hover:brightness-[1.03] active:translate-y-[1px]"
                  >
                    <SearchWhiteIcon />
                    Shiko Shërbimet
                  </Link>

                  <Link
                    href="/oferta"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f59e0b] to-[#ea580c] px-3 py-3 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(234,88,12,0.20)] ring-1 ring-white/25 hover:brightness-[1.03] active:translate-y-[1px]"
                  >
                    <FileTextWhiteIcon />
                    Merr Ofertën
                  </Link>
                </div>
              </div>

              {/* premium bottom border glow */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
            </div>
          </section>

          {/* SERVICES GRID */}
          <div className="mt-5">
            <ServicesGrid />
          </div>

          {/* JOBS */}
          <section className="mt-4 overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Punësim &amp; Bashkëpunime
                </h2>

                <Link
  href="/post/new"
  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-slate-900 ring-1 ring-black/10 shadow-sm hover:bg-slate-50 active:translate-y-[1px]"
>
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[12px] leading-none">
    +
  </span>
  Krijo postim
</Link>

              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <Link
                  href="/seeking"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#1f5b8f] to-[#174a74] px-3 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(31,91,143,0.22)] ring-1 ring-white/20 hover:brightness-[1.03] active:translate-y-[1px]"
                >
                  <BriefcaseIcon />
                  Kërkoj Punë
                </Link>

                <Link
                  href="/offering"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f59e0b] to-[#ea580c] px-3 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(234,88,12,0.18)] ring-1 ring-white/25 hover:brightness-[1.03] active:translate-y-[1px]"
                >
                  <HandshakeIcon />
                  Ofroj Punë
                </Link>
              </div>
            </div>

            {/* subtle separator */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
          </section>
        </div>
      </main>
    </>
  );
}

/* --- Icons (inline SVG) --- */

function SearchWhiteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileTextWhiteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-5-6z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 17h6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 6V5a2 2 0 012-2h0a2 2 0 012 2v1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 8h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 13h16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12l2 2a2 2 0 003 0l1-1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12l4-4a2 2 0 012.8 0L11 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12l-4-4a2 2 0 00-2.8 0L13 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16l2 2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 16l-2 2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
