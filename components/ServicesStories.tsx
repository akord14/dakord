"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string; // /public path
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

  // ✅ Shto sa shërbime të duash këtu (kopjo këtë model)
  // {
  //   slug: "access-control",
  //   title: "Access Control",
  //   description: "Kontroll hyrje-dalje për ambiente dhe biznese.",
  //   image: "/services/access-control.jpg",
  // },
];

export default function ServicesStories() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    // lëviz afërsisht sa gjerësia e 1 karte + gap
    const card = el.querySelector<HTMLElement>("[data-card='service']");
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const hasMany = useMemo(() => services.length > 3, []);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="px-5 pt-8 pb-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          Shërbimet Profesionale
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Zgjidhje të sigurta dhe moderne — të menduara për shtëpi dhe biznese.
        </p>
      </div>

      <div className="px-5 pb-8">
        <div className="relative">
          {/* Arrows (vetëm kur ka kuptim) */}
          {hasMany && (
            <>
              <button
                type="button"
                onClick={() => scrollByCard("left")}
                className="hidden sm:inline-flex absolute left-2 top-1/2 -translate-y-1/2 z-10
                           h-10 w-10 items-center justify-center rounded-full
                           bg-white/90 border border-slate-200 shadow-sm hover:bg-white"
                aria-label="Majtas"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => scrollByCard("right")}
                className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 z-10
                           h-10 w-10 items-center justify-center rounded-full
                           bg-white/90 border border-slate-200 shadow-sm hover:bg-white"
                aria-label="Djathtas"
              >
                ›
              </button>
            </>
          )}

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
                       [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-card="service"
                className="
                  snap-start
                  shrink-0
                  w-[32%] min-w-[32%]
                  sm:w-[320px] sm:min-w-[320px]
                  rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition
                  overflow-hidden group
                "
              >
                <div className="relative w-full aspect-[16/10] bg-slate-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 33vw, 320px"
                    className="object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="text-[13px] sm:text-base font-semibold text-slate-900 leading-snug line-clamp-2">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>

                  <div className="mt-3">
                    <div
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2
                                 text-[12px] sm:text-sm font-semibold
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
      </div>
    </section>
  );
}
