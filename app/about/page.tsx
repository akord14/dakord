import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Kush jemi</h1>
      <p className="mt-3 text-slate-600">
        Akord.al është një platformë që lidh njerëzit me shërbime dhe bashkëpunime
        të besueshme — shpejt, thjeshtë dhe me transparencë.
      </p>

      <div className="mt-8 rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="text-lg font-extrabold text-slate-900">Misioni</h2>
        <p className="mt-2 text-sm text-slate-600">
          Të krijojmë një vend ku kërkesa dhe oferta takohen me besim: shërbime të
          verifikuara dhe postime të moderuara nga admini.
        </p>

        <h2 className="mt-6 text-lg font-extrabold text-slate-900">Si punojmë</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Postimet dhe shërbimet kalojnë moderim.</li>
          <li>Komunikimi bëhet direkt dhe pa humbur kohë.</li>
          <li>Fokus tek cilësia, thjeshtësia dhe rezultati.</li>
        </ul>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
        >
          Kthehu në Home
        </Link>
        <Link
          href="/services"
          className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-900 ring-1 ring-black/10 hover:bg-slate-50"
        >
          Shërbimet
        </Link>
      </div>
    </main>
  );
}
