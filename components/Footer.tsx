// components/Footer.tsx
import Link from "next/link";

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
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
      🤝
    </span>
    <span className="text-[22px] font-extrabold tracking-tight text-white">
      Akord.al
    </span>
  </div>

  <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
    Shërbime të verifikuara &amp; Punësim — gjithçka në një vend.
  </p>

  <a
    href={whatsappHref}
    target="_blank"
    rel="noreferrer"
    className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm font-extrabold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
  >
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/90 ring-1 ring-emerald-200/30">
      <span className="text-[11px] leading-none">W</span>
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
  href="/#si-funksionon"
  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
>
  <span>Si funksionon</span>
  <span className="text-white/50 transition group-hover:text-white/80">›</span>
</Link>

<Link
  href="/rreth-nesh"
  className="group flex items-center justify-between rounded-xl px-1 py-2 text-sm font-semibold text-white/90 hover:text-white"
>
  <span>Rreth nesh</span>
  <span className="text-white/50 transition group-hover:text-white/80">›</span>
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
