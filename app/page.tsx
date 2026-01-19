// app/page.tsx
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "355XXXXXXXXX"; // <-- vendos numrin tend me kod vendi, p.sh. 3556...

const services = [
  {
    title: "Sisteme Monitorimi",
    href: "/services/monitoring-systems",
    img: "/mock/services/monitorimi.jpg",
  },
  {
    title: "Rikonstruksione",
    href: "/services/renovation",
    img: "/mock/services/rikonstruksione.jpg",
  },
  {
    title: "Sisteme Elektrike",
    href: "/services/electrical-systems",
    img: "/mock/services/elektrike.jpg",
  },
  {
    title: "Sisteme Sigurie",
    href: "/services/security-systems",
    img: "/mock/services/sigurie.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-4">
        {/* LOGO TOP */}
        <div className="flex items-center justify-center py-2">
          <div className="relative h-10 w-44">
            {/* Ndrysho path-in sipas logos tende */}
            <Image
              src="/logo.png"
              alt="AKORD.al"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl shadow-sm">
          {/* Background image (blur city) */}
          <div className="relative h-40 w-full">
            <Image
              src="/mock/hero-city.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
              Shërbime të verifikuara
            </h1>

            <div className="mt-4 grid w-full grid-cols-2 gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur hover:bg-white"
              >
                Shiko Shërbimet
                <ChevronRight />
              </Link>

              <Link
                href="/post"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Postime Punësimi
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICES MAIN */}
        <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            Shërbimet Kryesore
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group relative h-24 overflow-hidden rounded-xl shadow-sm"
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-extrabold text-white drop-shadow">
                    {s.title}
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/25">
                    <ChevronRightWhite />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/services"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-200"
          >
            Shiko të gjitha shërbimet
            <ChevronRight />
          </Link>
        </section>

        {/* JOBS */}
        <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            Punësim &amp; Bashkëpunime
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href="/seeking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f5b8f] px-3 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95"
            >
              <BriefcaseIcon />
              Kërkoj Punë
            </Link>

            <Link
              href="/offering"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-orange-600"
            >
              <HandshakeIcon />
              Ofroj Punë
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-center text-lg font-extrabold text-slate-900">
            Të funksionon Akord.al:
          </h2>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <HowCard icon={<SearchIcon />} text="Gjej Shërbimet" />
            <HowCard icon={<ShieldIcon />} text="Profesionistë të Verifikuar" />
            <HowCard icon={<WhatsAppIcon />} text="Kontakto në WhatsApp" />

          </div>

         
        </section>

        {/* FOOTER */}
        <footer className="mt-6 text-center text-xs text-slate-600">
          Të gjitha të drejtat të rezervuar © Akord.al
        </footer>
      </div>
    </main>
  );
}

function HowCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 px-2 py-3 text-center shadow-sm">
      <div className="mb-2">{icon}</div>
      <div className="text-xs font-semibold text-slate-800">{text}</div>
    </div>
  );
}

/* --- Icons (inline SVG) --- */

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightWhite() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke="#111827" strokeWidth="2" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
        stroke="#111827"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="#111827" strokeWidth="2" />
      <path
        d="M12 7v2"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 11.6a8 8 0 10-14.9 4.1L4 21l5.5-1.1A8 8 0 0020 11.6z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 9.7c.1-.3.3-.5.6-.5h.7c.2 0 .4.1.5.3l.6 1.4c.1.2 0 .5-.2.6l-.5.4c.7 1.3 1.8 2.4 3.1 3.1l.4-.5c.1-.2.4-.3.6-.2l1.4.6c.2.1.3.3.3.5v.7c0 .3-.2.6-.5.6-1 .2-2.8 0-5-2.2-2.2-2.2-2.4-4-2.2-5z"
        fill="white"
      />
    </svg>
  );
}
