"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  whatsappNumber?: string;
};

type Service = {
  title: string;
  description: string;
  image: string; // /services/xxx.jpg
  message: string; // whatsapp prefill
};

export default function ServicesStories({ whatsappNumber }: Props) {
  const services: Service[] = useMemo(
    () => [
      {
        title: "Zhvillim Software",
        description:
          "Krijim website & aplikacione, sisteme menaxhimi dhe zgjidhje të personalizuara.",
        image: "/services/software-development.jpg",
        message: "Përshëndetje! Jam i interesuar për shërbimin Zhvillim Software.",
      },
      {
        title: "Sisteme Sigurie",
        description:
          "Alarm kundër vjedhjes, kundër zjarrit dhe kontroll hyrje-dalje (Access Control).",
        image: "/services/security-systems.jpg",
        message: "Përshëndetje! Jam i interesuar për shërbimin Sisteme Sigurie.",
      },
      {
        title: "Sisteme Monitorimi",
        description:
          "Kamera sigurie (CCTV), kamera IP, video-citofoni dhe monitorim i avancuar.",
        image: "/services/monitoring-systems.jpg",
        message: "Përshëndetje! Jam i interesuar për shërbimin Sisteme Monitorimi.",
      },
    ],
    []
  );

  const waBase =
    whatsappNumber && whatsappNumber.trim().length > 0
      ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
      : null;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-card='1']")) as HTMLElement[];
    const target = cards[idx];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(idx);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll("[data-card='1']")) as HTMLElement[];
      if (!cards.length) return;

      // gjej kartën më afër qendrës së viewport-it të track-ut
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      let bestIdx = 0;
      let bestDist = Infinity;

      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cCenter = r.left + r.width / 2;
        const d = Math.abs(centerX - cCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });

      setActive(bestIdx);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Shërbimet Profesionale
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto mt-3">
          Zgjidhje të sigurta dhe moderne — të menduara për shtëpi dhe biznese.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo(Math.max(0, active - 1))}
          className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
        >
          ◀
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === active ? "bg-blue-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Shërbimi ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(Math.min(services.length - 1, active + 1))}
          className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
        >
          ▶
        </button>
      </div>

      {/* Premium slider track */}
      <div
        ref={trackRef}
        className="relative overflow-x-auto no-scrollbar scroll-smooth"
        style={{ scrollSnapType: "x mandatory" as any }}
      >
        <div className="flex gap-6 px-2">
          {services.map((service, idx) => {
            const isActive = idx === active;
            const waLink = waBase
              ? `${waBase}?text=${encodeURIComponent(service.message)}`
              : null;

            return (
              <div
                key={service.title}
                data-card="1"
                className={[
                  "shrink-0",
                  "w-[85%] sm:w-[70%] lg:w-[42%]",
                  "scroll-snap-align-center",
                  "rounded-2xl overflow-hidden bg-white",
                  "border border-slate-200/70",
                  "shadow-sm hover:shadow-xl transition",
                  "transform-gpu",
                  isActive ? "scale-[1.02] opacity-100" : "scale-95 opacity-70",
                ].join(" ")}
                style={{ scrollSnapAlign: "center" as any }}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 bg-slate-100">
                  {/* Nëse foto mungon, prap duket premium sepse ka background */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // @ts-ignore
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-xl font-semibold drop-shadow">
                      {service.title}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 text-sm mb-5">{service.description}</p>

                  {waLink ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Kërko në WhatsApp
                    </a>
                  ) : (
                    <div className="text-xs text-slate-500">
                      (WhatsApp number mungon)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* little premium hint line */}
      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
    </section>
  );
}

/** Utility: hide scrollbar (optional) **/
/* Tailwind doesn't include no-scrollbar by default; if you don't have it,
   it's fine—just remove "no-scrollbar" from the track className. */
