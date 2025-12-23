"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Service = {
  title: string;
  slug: string;
  image: string;
  short: string;
  whatsappText: string;
};

const services: Service[] = [
  {
    title: "Sisteme Sigurie",
    slug: "security-systems",
    image: "/services/security-systems.jpg",
    short: "Alarm, zjarri, access control",
    whatsappText: "Përshëndetje! Jam i interesuar për Sisteme Sigurie.",
  },
  {
    title: "Sisteme Monitorimi",
    slug: "monitoring-systems",
    image: "/services/monitoring-systems.jpg",
    short: "CCTV, IP, video-interfon",
    whatsappText: "Përshëndetje! Jam i interesuar për Sisteme Monitorimi.",
  },
  {
    title: "Zhvillim Software",
    slug: "software-development",
    image: "/services/software-development.jpg",
    short: "Web, panele, automatizime",
    whatsappText: "Përshëndetje! Jam i interesuar për Zhvillim Software.",
  },
];

function toWaLink(text: string) {
  const phone = ""; // optional: "3556XXXXXXXX"
  const encoded = encodeURIComponent(text);
  return phone
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
}

export default function ServicesStories() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);

  const openModal = (s: Service) => {
    setSelected(s);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSelected(null), 50);
  };

  // ESC to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Active = card closest to center of viewport
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => {
      const vpRect = viewport.getBoundingClientRect();
      const vpCenterY = vpRect.top + vpRect.height / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        const dist = Math.abs(centerY - vpCenterY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActive(bestIdx);
    };

    onScroll();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, []);

  // Premium “tube”: center big, neighbors faded/blurred and slightly rotated
  const cardStyle = useMemo(() => {
    return (idx: number) => {
      const d = idx - active;
      const abs = Math.abs(d);

      const isCenter = d === 0;
      const isNeighbor = abs === 1;

      const scale = isCenter ? 1.06 : isNeighbor ? 0.9 : 0.8;
      const opacity = isCenter ? 1 : isNeighbor ? 0.45 : 0.22;
      const blur = isCenter ? 0 : isNeighbor ? 0.6 : 1.2;

      const rotateX = isCenter ? 0 : d > 0 ? -18 : 18;
      const translateY = isCenter ? 0 : d > 0 ? 10 : -10;

      return {
        transform: `perspective(1100px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px) saturate(${isCenter ? 1 : 0.9})`,
      } as React.CSSProperties;
    };
  }, [active]);

  const scrollToIndex = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="mt-10 w-full">
      {/* FULL WIDTH + premium background */}
      <div className="w-full bg-gradient-to-b from-slate-50/90 via-white to-slate-50/80">
        <div className="w-full px-3 sm:px-6 py-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Shërbimet tona
                </h2>
                <div className="text-sm text-slate-600">
                  Zgjidhje profesionale • Instalime • Mirëmbajtje
                </div>
              </div>
            </div>

            {/* PREMIUM ARROWS */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-900 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Previous"
              >
                <svg
                  className="h-5 w-5 transition group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 14l6-6 6 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToIndex(Math.min(services.length - 1, active + 1))
                }
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-900 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Next"
              >
                <svg
                  className="h-5 w-5 transition group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 10l-6 6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* VIEWPORT - vertical coverflow */}
          <div
            ref={viewportRef}
            className="mt-6 w-full overflow-y-auto rounded-[32px] border border-slate-200/70 bg-white/70 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur"
            style={{
              height: "620px",
              scrollSnapType: "y mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            <div style={{ height: 80 }} />

            <div className="flex flex-col gap-0 px-2 sm:px-4">
              {services.map((s, idx) => (
                <div
                  key={s.slug}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  style={{ scrollSnapAlign: "center" }}
                  className="py-2"
                >
                  <button
                    type="button"
                    onClick={() => openModal(s)}
                    className="group w-full overflow-hidden rounded-[28px] border border-slate-200/70 bg-white text-left shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)] transition focus:outline-none focus:ring-2 focus:ring-slate-300"
                    style={cardStyle(idx)}
                  >
                    <div className="relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        style={{ height: 352 }}
                        loading="lazy"
                      />

                      {/* premium overlay (softened) */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                      {/* soft border highlight */}
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                      {/* top-right badge */}
                      <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        Konsultë falas
                      </div>

                      {/* TITLE ONLY (no short) */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-3xl font-extrabold leading-tight drop-shadow">
                          {s.title}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <a
                        href={toWaLink(s.whatsappText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-green-600 hover:shadow-lg"
                      >
                        WhatsApp
                      </a>

                      <div className="mt-3 text-center text-xs text-slate-500">
                        Përgjigje e shpejtë • Ofertë sipas nevojës
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ height: 80 }} />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full object-cover"
                style={{ height: 520 }}
              />
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
                aria-label="Close"
              >
                X
              </button>
            </div>

            <div className="p-5">
              <a
                href={toWaLink(selected.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 hover:shadow-lg"
              >
                Kontakto në WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
