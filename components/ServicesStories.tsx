"use client";

import { useEffect, useState } from "react";

type Service = {
  title: string;
  slug: string;
  image: string;
  short: string;
  whatsappText: string;
};

const services: Service[] = [
  {
    title: "Security",
    slug: "security-systems",
    image: "/services/security-systems.jpg",
    short: "Alarm, fire, access",
    whatsappText: "Hello! I am interested in Security Systems.",
  },
  {
    title: "Monitoring",
    slug: "monitoring-systems",
    image: "/services/monitoring-systems.jpg",
    short: "CCTV, IP, intercom",
    whatsappText: "Hello! I am interested in Monitoring Systems.",
  },
  {
    title: "Software",
    slug: "software-development",
    image: "/services/software-development.jpg",
    short: "Web, panels, automation",
    whatsappText: "Hello! I am interested in Software Development.",
  },
  // Shto sherbime te tjera ketu dhe do dalin me swipe automatikisht
];

function toWaLink(text: string) {
  // Optional: vendos numrin tend pa "+" (p.sh. "3556XXXXXXXX")
  const phone = "";
  const encoded = encodeURIComponent(text);
  return phone
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
}

export default function ServicesStories() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);

  const openModal = (s: Service) => {
    setSelected(s);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    // delay small for smoother UI; optional
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

  return (
    <section className="mt-8 w-full">
      {/* px-2 ne mobile per te hequr hapesirat anash */}
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Services</h2>
          <span className="text-xs text-slate-500">Swipe</span>
        </div>

        {/* SLIDER horizontal */}
        <div
          className="mt-4 overflow-x-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          <div className="flex gap-3 snap-x snap-mandatory pr-2">
            {services.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => openModal(s)}
                className="snap-start shrink-0 rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                style={{
                  width: "calc((100vw - 16px - 16px - 12px - 12px) / 3)",
                  minWidth: "110px",
                  maxWidth: "160px",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-[90px] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white drop-shadow">
                    <div className="text-sm font-semibold leading-tight">
                      {s.title}
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-[11px] leading-snug text-slate-600">
                    {s.short}
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-900">
                    <span>View</span>
                    <span>{">"}</span>
                  </div>
                </div>
              </button>
            ))}

            <div className="shrink-0 w-2" />
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* MODAL */}
      {open && selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-[260px] w-full object-cover"
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
              <div className="text-lg font-semibold text-slate-900">
                {selected.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">{selected.short}</div>

              <a
                href={toWaLink(selected.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                WhatsApp
              </a>

              <button
                type="button"
                onClick={closeModal}
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
