import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    title: "Mobilieri",
    slug: "costum-furniture",
    image: "/services/costum-furniture.jpg",
  },
  {
    title: "Sisteme Parkimi",
    slug: "parking-systems",
    image: "/services/parking-systems.jpg",
  },
  {
    title: "Sisteme WiFi",
    slug: "wifi-networking-systems",
    image: "/services/wifi-networking-systems.jpg",
  },
  {
    title: "Sisteme Hotelerie",
    slug: "hotel-management-systems",
    image: "/services/hotel-management-systems.jpg",
  },
  {
    title: "Akses Kontrolli",
    slug: "access-control-systems",
    image: "/services/access-control-systems.jpg",
  },
  {
    title: "Sisteme Audio",
    slug: "audio-systems",
    image: "/services/audio-systems.jpg",
  },
  {
    title: "Ndriçim Skenik",
    slug: "stage-lighting-system",
    image: "/services/stage-lighting-system.jpg",
  },
  {
    title: "Smart Home",
    slug: "smart-home",
    image: "/services/smart-home.jpg",
  },
  {title: "Kondicionim & Aspirim", slug: "hvac-conditioning-ventilation", image: "/services/hvac-conditioning-ventilation.jpg" },
  { title: "Sisteme Monitorimi", slug: "monitoring-systems", image: "/services/monitoring-systems.jpg" },
  { title: "Sisteme Alarmi", slug: "alarm-systems", image: "/services/alarm-systems.jpg" },
  { title: "Graphic Design & Branding", slug: "graphic-design-branding", image: "/services/graphic-design-branding.jpg" },
  { title: "Web & App Development", slug: "web-app-development", image: "/services/web-app-development.jpg" },
  { title: "Social Media Management", slug: "social-media-management", image: "/services/social-media-management.jpg" },
  { title: "Digital Marketing / Ads", slug: "digital-marketing-ads", image: "/services/digital-marketing-ads.jpg" },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold">Shërbimi nuk u gjet</h1>
        <p className="mt-2 text-slate-600">Kthehu te lista e shërbimeve.</p>
        <Link className="mt-6 inline-block text-blue-700 underline" href="/services">
          ← Shërbimet
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6">
        <Link href="/services" className="text-sm font-bold text-slate-700 hover:underline">
          ← Shërbimet
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
          {service.title}
        </h1>

        <p className="mt-2 text-slate-600">
          Na shkruaj në WhatsApp dhe të dërgojmë ofertë brenda pak minutash.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-[16/9] w-full bg-slate-50">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              Kliko butonin dhe na trego çfarë të duhet — të përgjigjemi shpejt.
            </div>

            <a
              href={`https://wa.me/355695111179?text=${encodeURIComponent(
                `Përshëndetje! Dua ofertë për: ${service.title}`
              )}`}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:opacity-95"
            >
              Kontakto në WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
