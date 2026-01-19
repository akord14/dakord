import Link from "next/link";

const services = [
  {
    title: "Sisteme Monitorimi",
    slug: "monitoring-systems",
  },
  {
    title: "Rikonstruksione",
    slug: "renovation",
  },
  {
    title: "Sisteme Elektrike",
    slug: "electrical-systems",
  },
  {
    title: "Sisteme Sigurie",
    slug: "security-systems",
  },
];

export default function ServicesIndex() {
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
            className="relative flex h-24 items-end justify-between rounded-xl bg-slate-200 p-3 shadow-sm hover:bg-slate-300"
          >
            <span className="text-sm font-bold text-slate-900">
              {service.title}
            </span>
            <span className="text-slate-600">→</span>
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
