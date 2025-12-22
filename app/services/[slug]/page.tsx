import Link from "next/link";
import { notFound } from "next/navigation";

type Service = {
  title: string;
  slug: string;
  image: string;
  description: string;
  bullets: string[];
  whatsappText: string;
};

const SERVICES: Service[] = [
  {
    title: "Security Systems",
    slug: "security-systems",
    image: "/services/security-systems.jpg",
    description:
      "Design and installation of professional security systems for homes and businesses.",
    bullets: [
      "Anti-theft alarm systems",
      "Fire detection systems",
      "Access control",
      "Professional installation and support",
    ],
    whatsappText: "Hello! I am interested in Security Systems.",
  },
  {
    title: "Monitoring Systems",
    slug: "monitoring-systems",
    image: "/services/monitoring-systems.jpg",
    description:
      "CCTV and monitoring solutions with remote viewing and reliable recording.",
    bullets: [
      "CCTV cameras",
      "IP cameras",
      "Video intercom",
      "Remote viewing setup",
    ],
    whatsappText: "Hello! I am interested in Monitoring Systems.",
  },
  {
    title: "Software Development",
    slug: "software-development",
    image: "/services/software-development.jpg",
    description:
      "Web solutions for businesses: landing pages, admin panels, and integrations.",
    bullets: [
      "Web development",
      "Landing pages",
      "Admin panels",
      "Integrations and automation",
    ],
    whatsappText: "Hello! I am interested in Software Development.",
  },
];

function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

function toWaLink(text: string) {
  // Optional: put your phone here without "+" (example "3556XXXXXXXX")
  const phone = "";
  const encoded = encodeURIComponent(text);
  return phone
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);

  if (!service) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-slate-600 hover:underline">
          {"<"} Back to home
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="h-[260px] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">{service.title}</h1>
          <p className="mt-3 text-slate-600">{service.description}</p>

          <ul className="mt-5 space-y-2 text-slate-700">
            {service.bullets.map((b) => (
              <li key={b}>- {b}</li>
            ))}
          </ul>

          <a
            href={toWaLink(service.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95 md:w-auto"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
