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
      {/* LIGHT PREMIUM BACKGROUND */}
      <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="w-full px-3 sm:px-6 py-8">
          {/* HEADER */}
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
          </div>

          {/* VIEWPORT WRAPPER (for sticky arrows) */}
          <div className="relative mt-6">
            {/* STICKY / FLOATING ARROWS INSIDE VIEWPORT */}
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-end justify-center pr-3 sm:pr-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => scrollToIndex(Math.max(0, active - 1))}
                  className="pointer-events-auto group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-900 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                  className="pointer-events-auto group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-900 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
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
              className="w-full overflow-y-auto rounded-[32px] border border-slate-200/70 bg-white/70 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur"
              style={{
                height: "620px",
                scrollSnapType: "y mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              <div style={{ height: 80 }} />

              <div className="flex flex-col gap-0 px-2 sm:px-4">
                {services.map((s, idx) => {
                  const isActive = idx === active;

                  return (
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
                        className={[
                          "group w-full overflow-hidden rounded-[28px] border bg-white text-left transition focus:outline-none focus:ring-2 focus:ring-slate-300",
                          isActive
                            ? "border-slate-300 shadow-[0_18px_55px_-22px_rgba(15,23,42,0.60)] ring-2 ring-slate-900/10"
                            : "border-slate-200/70 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]",
                        ].join(" ")}
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

                          {/* soft overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                          {/* shine (only active card) */}
                          {isActive && (
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-white/0 to-white/0" />
                          )}

                          {/* soft border highlight */}
                          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                          {/* top-right badge */}
                          <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            Konsultë falas
                          </div>

                          {/* TITLE ONLY */}
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="text-3xl font-extrabold leading-tight drop-shadow">
                              {s.title}
                            </div>
                          </div>
                        </div>

                        {/* PREMIUM CTA */}
                        <div className="p-5">
                          <a
                            href={toWaLink(s.whatsappText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
                          >
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 32 32"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M19.11 17.33c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.29-1.4-.85-.76-1.42-1.7-1.59-1.98-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.35s1.01 2.74 1.15 2.93c.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.89-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
                              <path d="M26.66 5.34C24.04 2.72 20.55 1.28 16.84 1.28 9.23 1.28 3.04 7.47 3.04 15.08c0 2.43.64 4.8 1.86 6.89L3 30.72l8.93-1.83c2.04 1.11 4.33 1.7 6.66 1.7h.01c7.61 0 13.8-6.19 13.8-13.8 0-3.71-1.44-7.2-4.06-9.45zM18.59 28.1h-.01c-2.06 0-4.08-.55-5.85-1.6l-.42-.25-5.3 1.09 1.12-5.17-.27-.43c-1.14-1.81-1.74-3.9-1.74-6.03 0-6.23 5.07-11.3 11.31-11.3 3.02 0 5.85 1.18 7.98 3.31 2.13 2.13 3.3 4.96 3.3 7.99 0 6.23-5.07 11.39-11.12 11.39z" />
                            </svg>
                            WhatsApp
                          </a>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div style={{ height: 80 }} />
            </div>
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
