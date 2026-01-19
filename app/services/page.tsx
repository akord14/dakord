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
      <div className="grid grid-cols-2 gap-4">
  {services.map((service) => (
    <Link
      key={service.slug}
      href={`/services/${service.slug}`}
      className="
        group relative h-28 rounded-2xl bg-white
        p-4 shadow-sm ring-1 ring-slate-200
        transition-all duration-200
        hover:shadow-md hover:-translate-y-[1px]
        active:scale-[0.98]
      "
    >
      {/* Title */}
      <div className="flex h-full flex-col justify-between">
        <span className="text-sm font-extrabold text-slate-900 leading-tight">
          {service.title}
        </span>

        {/* Arrow */}
        <span className="
          mt-2 inline-flex h-8 w-8 items-center justify-center
          rounded-full bg-slate-100 text-slate-700
          transition-colors
          group-hover:bg-slate-900 group-hover:text-white
        ">
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
