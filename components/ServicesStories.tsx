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

      const scale = isCenter ? 1.06 : isNeighbor ? 0.90 : 0.80;
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
      <div className="w-full bg-slate-50/80">
        {/* minimal padding so it feels full-bleed, but not touching edges */}
        <div className="w-full px-2 sm:px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Shërbimet tona</h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
                aria-label="Previous"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollToIndex(Math.min(services.length - 1, active + 1))
                }
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
                aria-label="Next"
              >
                ↓
              </button>
            </div>
          </div>

          {/* VIEWPORT - vertical coverflow */}
          <div
            ref={viewportRef}
            className="mt-5 w-full overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-sm"
            style={{
              height: "620px",
              scrollSnapType: "y mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {/* tight buffers = cards closer, but still show prev/next */}
            <div style={{ height: 70 }} />

            {/* gap-0 to reduce spacing between services */}
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
                    className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-md transition focus:outline-none focus:ring-2 focus:ring-slate-300"
                    style={cardStyle(idx)}
                  >
                    {/* Portrait-friendly “poster” area */}
                    <div className="relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full object-cover"
                        // “poster vibe”: taller image area (vertical feel)
                        style={{ height: 340 }}
                        loading="lazy"
                      />

                      {/* premium overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                      {/* text overlay - clean and big */}
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <div className="text-3xl font-extrabold leading-tight drop-shadow">
                          {s.title}
                        </div>
                        <div className="mt-2 text-base text-white/90 drop-shadow">
                          {s.short}
                        </div>
                      </div>
                    </div>

                    {/* bottom actions - keep minimal, no extra texts */}
                    <div className="p-5">
                      <a
                        href={toWaLink(s.whatsappText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-4 text-base font-semibold text-white hover:bg-green-600"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ height: 70 }} />
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

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent p-5 text-white">
                <div className="text-xl font-bold">{selected.title}</div>
                <div className="text-sm text-white/90">{selected.short}</div>
              </div>
            </div>

            <div className="p-5">
              <a
                href={toWaLink(selected.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
              >
                Kontakto në WhatsApp
              </a>

              <button
                type="button"
                onClick={closeModal}
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Mbyll
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
