"use client";

import { useMemo, useState } from "react";

type Service = {
  id: string;
  title: string;          // del sipër në modal
  cover: string;          // rrethi (mund të jetë e njëjta foto)
  poster: string;         // foto e madhe (template)
  waText: string;         // mesazhi i parapërgatitur
};

type Props = {
  whatsappNumber: string; // p.sh. "35569xxxxxxx" (pa +, pa hapsira)
};

export default function ServicesStories({ whatsappNumber }: Props) {
  const services = useMemo<Service[]>(
    () => [
      {
  id: "menaxhim-digjital",
  title: "Menaxhim Digjital",
  cover: "/images/services/menaxhim-digjital.jpg",
  poster: "/images/services/menaxhim-digjital.jpg",
  waText: "Përshëndetje, jam i interesuar për shërbimin “Menaxhim Digjital” dhe do të doja një ofertë.",
},

      {
        id: "logo",
        title: "Logo",
        cover: "/images/services/logo.jpg",
        poster: "/images/services/logo.jpg",
        waText: "Përshëndetje, dua shërbimin Logo.",
      },
      {
        id: "photoshop",
        title: "Modifikim me Photoshop",
        cover: "/images/services/photoshop.jpg",
        poster: "/images/services/photoshop.jpg",
        waText: "Përshëndetje, dua shërbimin Modifikim me Photoshop.",
      },
      {
        id: "graphic-design",
        title: "Graphic Design",
        cover: "/images/services/graphic-design.jpg",
        poster: "/images/services/graphic-design.jpg",
        waText: "Përshëndetje, dua shërbimin Graphic Design.",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Service | null>(null);

  const openService = (s: Service) => {
    setActive(s);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  const waLink = (text: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  return (
    <section className="w-full mx-auto max-w-5xl px-4 pt-4">
  <div className="rounded-2xl bg-white/70 backdrop-blur border border-gray-200 p-4 shadow-sm"></div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shërbimet tona</h2>
        <span className="text-sm text-gray-500">Rrëshqit →</span>
      </div>

      <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => openService(s)}
            className="flex flex-col items-center shrink-0"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm">
              {/* cover */}
              <img
                src={s.cover}
                alt={s.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700 max-w-[72px] text-center line-clamp-2">
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{active.title}</div>
                <div className="text-sm text-gray-500">
                  Na shkruaj në WhatsApp dhe ta sjellim ofertën më të mirë.
                </div>
              </div>
              <button
                onClick={close}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Mbyll
              </button>
            </div>

            <div className="px-4">
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={active.poster}
                  alt={active.title}
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="p-4">
              <a
                href={waLink(active.waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-full px-5 py-3 bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Shkruaj në WhatsApp
              </a>
            </div>
          </div>
        </div>
    
      )}
    </section>
  );
}
