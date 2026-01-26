// components/Footer.tsx
import Link from "next/link";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="#25D366"
    >
      <path d="M19.11 17.36c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
      <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.11.55 4.12 1.59 5.9L4 29l8.33-1.55c1.72.94 3.66 1.44 5.69 1.44 6.62 0 12-5.38 12-12S22.64 3 16.02 3zm0 22.02c-1.8 0-3.48-.52-4.91-1.42l-.35-.21-4.95.92.93-4.83-.23-.37A9.95 9.95 0 0 1 6.02 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  // TODO: vendos numrin tënd real (format: 3556XXXXXXXX)
  const WHATSAPP_PHONE = "355695111179";
  const WHATSAPP_TEXT =
    "Përshëndetje! Dua të flasim për një bashkëpunim / projekt.";

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  return (
    <footer className="mt-12 border-t border-white/10 bg-gradient-to-b from-[#07121f] via-[#07192a] to-[#050c14]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand + CTA */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              {/* Akord official logo (white circle, full) */}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                <img
                  src="/logo.png"
                  alt="Akord.al"
                  className="h-8 w-8 object-contain"
                />
              </span>

              <span className="text-[22px] font-extrabold tracking-tight text-white">
                Akord.al
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
              Shërbime të verifikuara &amp; Punësim — gjithçka në një vend.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm backdrop-blur hover:bg-white/15 active:translate-y-[1px]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              Na kontakto në WhatsApp
            </a>
          </div>

          {/* Links (footer final) */}
          <div className="w-full md:w-auto">
            <div className="w-full max-w-xs text-left">
              <div className="space-y-3">
                <Link
                  href="/bashkepuno"
                  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <span>Bashkëpuno me ne</span>
                  <span className="text-white/50 transition group-hover:text-white/80">
                    ›
                  </span>
                </Link>

                <Link
                  href="/garanci"
                  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <span>Garanci për shërbimet</span>
                  <span className="text-white/50 transition group-hover:text-white/80">
                    ›
                  </span>
                </Link>

                <Link
                  href="/si-funksionon"
                  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <span>Si funksionon</span>
                  <span className="text-white/50 transition group-hover:text-white/80">
                    ›
                  </span>
                </Link>

                <Link
                  href="/rreth-nesh"
                  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <span>Rreth nesh</span>
                  <span className="text-white/50 transition group-hover:text-white/80">
                    ›
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom / Legal */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-400">
            © {year} Akord.al. Të gjitha të drejtat të rezervuara.
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link className="text-slate-400 hover:text-white" href="/privacy">
              Privacy
            </Link>
            <Link className="text-slate-400 hover:text-white" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
