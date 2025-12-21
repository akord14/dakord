"use client";

import Image from "next/image";
import Link from "next/link";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string; // path under /public
};

const services: Service[] = [
  {
    slug: "security-systems",
    title: "Siguri & Monitorim",
    description: "Zgjidhje të sigurta për monitorimin dhe sigurinë tuaj.",
    image: "/services/security-systems.jpg",
  },
  {
    slug: "monitoring-systems",
    title: "Instalime Elektrike",
    description: "Asistencë dhe instalime elektrike korrekte për shtëpi dhe biznese.",
    image: "/services/monitoring-systems.jpg",
  },
  {
    slug: "software-development",
    title: "Zhvillim Software",
    description: "Krijim website & aplikacione, sisteme menaxhimi dhe zgjidhje të personalizuara.",
    image: "/services/software-development.jpg",
  },
];

export default function ServicesStories() {
  return (
    <section className="w-full">
      {/* HEADER (mbaje këtu që të mos dalë dy herë nga page.tsx) */}
      <div className="px-5 pt-8 pb-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          Shërbimet Profesionale
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Zgjidhje të sigurta dhe moderne — të menduara për shtëpi dhe biznese.
        </p>
      </div>

      {/* MOBILE: 3 karta në një rresht (si foto) */}
      <div className="px-5 pb-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 33vw, 300px"
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-[13px] sm:text-base font-semibold text-slate-900 leading-snug line-clamp-2">
                  {s.title}
                </h3>

                <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {s.description}
                </p>

                {/* CTA */}
                <div className="mt-3">
                  <div
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-[12px] sm:text-sm font-semibold
                               bg-slate-100 text-slate-900 border border-slate-200
                               group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition"
                  >
                    Më shumë <span aria-hidden>›</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
