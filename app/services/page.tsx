import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Sisteme Monitorimi",
    slug: "monitoring-systems",
    image: "/images/services/monitoring.jpg",
  },
  {
    title: "Rikonstruksione",
    slug: "renovation",
    image: "/images/services/renovation.jpg",
  },
  {
    title: "Sisteme Elektrike",
    slug: "electrical-systems",
    image: "/images/services/electrical.jpg",
  },
  {
    title: "Sisteme Sigurie",
    slug: "security-systems",
    image: "/images/services/security.jpg",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Shërbimet
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Zgjidh shërbimin që të nevojitet
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group relative h-28 overflow-hidden rounded-xl shadow-sm"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2">
              <span className="text-sm font-bold text-white">
                {service.title}
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
      >
        ← Kthehu në Home
      </Link>
    </main>
  );
}
