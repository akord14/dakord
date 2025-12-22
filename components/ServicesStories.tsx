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

  // detect active card = closest to viewport center
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

  // stronger tube effect + closer neighbors
  const cardStyle = useMemo(() => {
    return (idx: number) => {
      const d = idx - active;
      const abs = Math.abs(d);

      const scale =
        d === 0 ? 1 : abs === 1.03 ? 0.86 : 0.74; // neighbors clearly smaller
      const opacity =
        d === 0 ? 1 : abs === 1 ? 0.82 : 0.68;

      const rotateX = d === 0 ? 0 : d > 0 ? -20 : 20;
      const translateY = d === 0 ? 0 : d > 0 ? 10 : -10;

      return {
        transform: `perspective(1000px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
        opacity,
        filter: d === 0 ? "none" : "saturate(0.92) contrast(0.98)",
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
      <div className="w-full px-2 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Shërbimet</h2>
            <p className="mt-1 text-sm text-slate-600">
              Swipe lart/poshtë (tub premium)
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, active - 1))}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
              aria-label="Previous"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(services.length - 1, active + 1))}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
              aria-label="Next"
            >
              ↓
            </button>
          </div>
        </div>

        {/* Viewport larger + tighter padding = cards closer */}
        <div
          ref={viewportRef}
          className="mt-6 w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-sm"
          style={{
            height: "560px",
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {/* smaller top/bottom buffer so neighbors are visible */}
          <div style={{ height: 60 }} />

          <div className="flex flex-col gap-2 px-2 sm:px-4">
            {services.map((s, idx) => (
              <div
                key={s.slug}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                style={{ scrollSnapAlign: "center" }}
              >
                <button
                  type="button"
                  onClick={() => openModal(s)}
                  className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-md transition focus:outline-none focus:ring-2 focus:ring-slate-300"
                  style={cardStyle(idx)}
                >
                  <div className="relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-[240px] w-full object-cover sm:h-[260px]"
                      loading="lazy"
                    />
                    {/* premium overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-2xl font-extrabold leading-tight drop-shadow">
                        {s.title}
                      </div>
                      <div className="mt-1 text-sm text-white/90 drop-shadow">
                        {s.short}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">
                        Kliko per popup
                      </div>
                      <div className="text-sm font-semibold text-blue-700">
                        View {">"}
                      </div>
                    </div>

                    <a
                      href={toWaLink(s.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                    >
                      WhatsApp
                    </a>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div style={{ height: 60 }} />
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
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
                className="h-[360px] w-full object-cover sm:h-[460px]"
              />
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
                aria-label="Close"
              >
                X
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <div className="text-xl font-bold">{selected.title}</div>
                <div className="text-sm text-white/90">{selected.short}</div>
              </div>
            </div>

            <div className="p-5">
              <a
                href={toWaLink(selected.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                Kontakto ne WhatsApp
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
