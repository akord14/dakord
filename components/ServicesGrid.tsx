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

export default function ServicesGrid() {
  return (
    <section className="w-full px-2 py-6">
      {/* TITLE */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
          Shërbimet
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Zgjidh shërbimin që të duhet — përgjigjemi shpejt në WhatsApp.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {SERVICES.slice(0, 6).map((s, idx) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md ${
              idx >= 4 ? "hidden md:block" : ""
            }`}
          >
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-contain transition group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="flex items-center justify-between gap-2 px-3 py-3">
              <div className="min-w-0">
                <div className="text-sm font-extrabold leading-tight text-slate-900">
                  {s.title}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
                  Kliko për detaje
                </div>
              </div>

              {/* PREMIUM HAP */}
              <div className="shrink-0 rounded-xl border border-black bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-black transition hover:bg-blue-100">
                HAP
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SEE ALL */}
      <div className="mt-4">
        <Link
          href="/services"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-black bg-blue-50 px-6 py-3 text-sm font-extrabold text-black transition hover:bg-blue-100"
        >
          Shiko të gjitha shërbimet
        </Link>
      </div>
    </section>
  );
}
