import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="card p-8">
        <h2 className="text-3xl font-bold">Kërkoj Punë</h2>
        <p className="mt-2 text-slate-400">Shfleto oferta pune ose ndërto CV-në tënde.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/seeking" className="btn btn-outline">Shfleto</Link>
          <Link href="/cv/builder" className="btn btn-primary">KRIJO CV</Link>
        </div>
      </div>
      <div className="card p-8">
        <h2 className="text-3xl font-bold">Ofroj Punë</h2>
        <p className="mt-2 text-slate-400">Posto mundësi pune dhe gjej kandidatin e duhur.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/offering" className="btn btn-outline">Shfleto</Link>
          <Link href="/post/new?type=offering" className="btn btn-primary">Posto ofertë</Link>
        </div>
      </div>
      <div className="md:col-span-2 card p-8">
        <h3 className="text-xl font-semibold">Si funksionon?</h3>
        <ol className="mt-3 list-decimal list-inside text-slate-300 space-y-1">
          <li>Posto kërkesën/ofertën</li>
          <li>Admini e aprovon</li>
          <li>Shfaqet publikisht</li>
        </ol>
      </div>
    </section>
  );
}
