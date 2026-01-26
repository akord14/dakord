import Link from "next/link";

export const metadata = {
  title: "Bashkëpuno me ne | Akord.al",
  description:
    "Bashkëpuno me Akord.al si profesionist ose kompani dhe ofro shërbime për klientët tanë.",
};

export default function BashkepunoPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          ← Home
        </Link>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Bashkëpuno me ne
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Akord.al bashkëpunon me profesionistë dhe kompani që ofrojnë shërbime
          cilësore. Nëse merresh me instalime, teknologji, dizajn, marketing apo
          shërbime të tjera profesionale, mund të bëhesh pjesë e rrjetit tonë.
        </p>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Kë kërkojmë?
          </h2>

          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Profesionistë ose kompani serioze</li>
            <li>Eksperiencë reale në shërbimin që ofron</li>
            <li>Përgjigje të shpejta dhe komunikim korrekt</li>
            <li>Disponueshmëri për bashkëpunim afatgjatë</li>
          </ul>

          <h2 className="pt-2 text-lg font-extrabold text-slate-900">
            Si funksionon bashkëpunimi?
          </h2>

          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Klientët na kontaktojnë përmes Akord.al</li>
            <li>Ne filtrojmë kërkesat dhe i përcjellim te partnerët</li>
            <li>Bashkëpunimi bazohet në marrëveshje të qarta dhe transparente</li>
          </ul>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/355695111179"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-extrabold text-white hover:opacity-95"
        >
          Na kontakto në WhatsApp
        </a>

        <p className="mt-3 text-center text-xs text-slate-500">
          Do të të përgjigjemi sa më shpejt.
        </p>
      </div>
    </main>
  );
}
