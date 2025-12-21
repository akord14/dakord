import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Service = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bullets: string[];
  whatsappText: string;
};

const SERVICES: Service[] = [
  {
    slug: "security-systems",
    title: "Siguri & Monitorim",
    subtitle: "Zgjidhje të sigurta për shtëpi dhe biznese.",
    description:
      "Instalim profesional i sistemeve të sigurisë dhe konfigurim i plotë për një kontroll maksimal. Punojmë me pajisje cilësore dhe zgjidhje të përshtatura sipas objektit tuaj.",
    image: "/services/security-systems.jpg",
    bullets: [
      "Kamera sigurie (IP / analog) & konfigurim",
      "Sisteme alarmi kundër vjedhjes",
      "Kontroll hyrje-dalje (Access Control)",
      "Konfigurime remote & mirëmbajtje",
    ],
    whatsappText:
      "Përshëndetje Akord.al! Dua ofertë për Siguri & Monitorim. Mund të më ndihmoni?",
  },
  {
    slug: "monitoring-systems",
    title: "Instalime Elektrike",
    subtitle: "Instalime korrekte, të sigurta dhe të standardizuara.",
    description:
      "Shërbime elektrike për shtëpi dhe biznese: instalime të reja, rregullime dhe përmirësime. Fokus te siguria, pastërtia e punës dhe zgjidhjet afatgjata.",
    image: "/services/monitoring-systems.jpg",
    bullets: [
      "Instalime të reja & riparime",
      "Ndriçim, prize, automatikë, tokëzim",
      "Organizim paneli / kutie elektrike",
      "Diagnostikim i problemeve",
    ],
    whatsappText:
      "Përshëndetje Akord.al! Dua ofertë për Instalime Elektrike. Mund të flasim?",
  },
  {
    slug: "software-development",
    title: "Zhvillim Software",
    subtitle: "Website & aplikacione të personalizuara për biznesin tuaj.",
    description:
      "Ndërtojmë faqe moderne, sisteme menaxhimi dhe automatizime që të kursejnë kohë dhe rrisin performancën. Fokus në dizajn premium, shpejtësi dhe SEO.",
    image: "/services/software-development.jpg",
    bullets: [
      "Website profesional & landing pages",
      "Sisteme menaxhimi (CRM / admin panel)",
      "Integrime & automatizime",
      "SEO bazë & performancë",
    ],
    whatsappText:
      "Përshëndetje Akord.al! Dua ofertë për Zhvillim Software. A mund të më jepni disa detaje?",
  },
];

function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) return notFound();

  // Ndrysho numrin këtu (format ndërkombëtar pa +, p.sh. 355695111179)
  const WHATSAPP_NUMBER = "355695111179";
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    service.whatsappText
  )}`;

  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_30%,white,transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />

        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-10 sm:pt-12 sm:pb-14 text-white">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold
                         bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition"
            >
              ← Shërbimet
            </Link>

            <Link
              href="/"
              className="text-sm font-semibold text-white/90 hover:text-white transition"
            >
              Akord.al
            </Link>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {service.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-white/85">
                {service.subtitle}
              </p>

              <p className="mt-5 text-sm sm:text-base text-white/80 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                             bg-gradient-to-r from-green-600 to-emerald-600
                             shadow-[0_14px_30px_-22px_rgba(16,185,129,0.9)]
                             hover:from-green-700 hover:to-emerald-700 active:scale-[0.99] transition"
                >
                  Kërko ofertë në WhatsApp
                </a>

                <Link
                  href="/post"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                             bg-white/10 border border-white/20 backdrop-blur
                             hover:bg-white/15 active:scale-[0.99] transition"
                >
                  Shiko postime pune
                </Link>
              </div>
            </div>

            {/* image */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur shadow-[0_18px_40px_-26px_rgba(2,6,23,0.8)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-800">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {/* left */}
          <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.18)]">
            <h2 className="text-xl font-semibold text-slate-900">
              Çfarë përfshin shërbimi
            </h2>

            <ul className="mt-4 space-y-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm text-slate-700">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                Si vazhdojmë?
              </div>
              <div className="mt-1 text-sm text-slate-700 leading-relaxed">
                Na shkruaj në WhatsApp dhe na trego shkurt kërkesën. Ne të
                kthejmë përgjigje dhe të propozojmë zgjidhjen më të përshtatshme.
              </div>
            </div>
          </div>

          {/* right / contact card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.18)]">
            <h3 className="text-lg font-semibold text-slate-900">Kontakt</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Për ofertë, pyetje ose konsultim, na kontakto direkt.
            </p>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white
                         bg-gradient-to-r from-green-600 to-emerald-600
                         shadow-[0_14px_30px_-22px_rgba(16,185,129,0.9)]
                         hover:from-green-700 hover:to-emerald-700 active:scale-[0.99] transition"
            >
              WhatsApp – Kërko ofertë
            </a>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-700">
                Shënim
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Pagesa dhe marrëveshja realizohen në mënyrë tradicionale, pas
                konfirmimit të detajeve.
              </p>
            </div>

            <Link
              href="/#services"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                         border border-slate-200 bg-white hover:bg-slate-50 transition"
            >
              Kthehu te shërbimet
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          © 2025 akord.al
        </p>
      </section>
    </main>
  );
}
