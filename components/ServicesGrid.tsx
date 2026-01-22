import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    title: "Sisteme Monitorimi",
    slug: "monitoring-systems",
    image: "/services/monitoring-systems.jpg",
  },
  {
    title: "Sisteme Alarmi",
    slug: "alarm-systems",
    image: "/services/alarm-systems.jpg",
  },
  {
    title: "Graphic Design & Branding",
    slug: "graphic-design-branding",
    image: "/services/graphic-design-branding.jpg",
  },
  {
    title: "Web & App Development",
    slug: "web-app-development",
    image: "/services/web-app-development.jpg",
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    image: "/services/social-media-management.jpg",
  },
  {
    title: "Digital Marketing / Ads",
    slug: "digital-marketing-ads",
    image: "/services/digital-marketing-ads.jpg",
  },
];

export default function ServicesGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Shërbimet
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Zgjidh shërbimin që të duhet — përgjigjemi shpejt në WhatsApp.
          </p>
        </div>

        <Link
          href="/services"
          className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 sm:inline-flex"
        >
          Shiko të gjitha
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover transition group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <div className="min-w-0">
                <div className="truncate text-base font-extrabold text-slate-900">
                  {s.title}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  Kliko për detaje
                </div>
              </div>

              <div className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white opacity-90 group-hover:opacity-100">
                Hap
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 sm:hidden">
        <Link
          href="/services"
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Shiko të gjitha shërbimet
        </Link>
      </div>
    </section>
  );
}
