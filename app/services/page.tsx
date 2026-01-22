import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  { title: "Sisteme Monitorimi", slug: "monitoring-systems", image: "/services/monitoring-systems.jpg" },
  { title: "Sisteme Alarmi", slug: "alarm-systems", image: "/services/alarm-systems.jpg" },
  { title: "Graphic Design & Branding", slug: "graphic-design-branding", image: "/services/graphic-design-branding.jpg" },
  { title: "Web & App Development", slug: "web-app-development", image: "/services/web-app-development.jpg" },
  { title: "Social Media Management", slug: "social-media-management", image: "/services/social-media-management.jpg" },
  { title: "Digital Marketing / Ads", slug: "digital-marketing-ads", image: "/services/digital-marketing-ads.jpg" },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Shërbimet</h1>
        <p className="mt-2 text-slate-600">
          Zgjidh shërbimin që të duhet — përgjigjemi shpejt në WhatsApp.
        </p>
        <Link className="mt-4 inline-block text-blue-700 underline" href="/">
          ← Kthehu në Home
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-slate-50 to-white p-3">
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-slate-100 bg-white">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <div className="min-w-0">
                <div className="text-base font-extrabold text-slate-900 leading-tight">
                  {s.title}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  Kliko për detaje
                </div>
              </div>

              <div className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-900 shadow-sm group-hover:bg-slate-50">
                Shiko →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

