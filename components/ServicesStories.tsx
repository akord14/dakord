"use client";

import Link from "next/link";

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
  return (
    <section className="mt-8">
      {/* Container to remove big side space */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Services</h2>
          <span className="text-xs text-slate-500">3 on mobile</span>
        </div>

        {/* 3 columns even on mobile */}
        <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-[90px] w-full object-cover sm:h-[120px] md:h-[140px]"
                  loading="lazy"
                />
                {/* soft overlay for premium look */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="p-3 sm:p-4">
                <div className="text-sm font-semibold text-white -mt-9 sm:-mt-10 relative drop-shadow">
                  {s.title}
                </div>

                <div className="mt-2 text-[11px] leading-snug text-slate-600 sm:text-xs">
                  {s.short}
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-[12px] font-semibold text-white hover:opacity-95"
                  >
                    Details
                  </Link>

                  <a
                    href={toWaLink(s.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* optional divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
}
