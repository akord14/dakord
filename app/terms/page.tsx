import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Akord.al",
  description: "Kushtet e përdorimit për Akord.al.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          ← Home
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Kushtet e Përdorimit
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Duke përdorur Akord.al, pranoni këto kushte. Nëse nuk pajtoheni, ju
          lutem mos e përdorni platformën.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              1. Çfarë është Akord.al
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Akord.al është një platformë shërbimesh ku kërkesat trajtohen nga
              ekipi/partnerët e Akord.al dhe ju kontaktoheni për të finalizuar
              shërbimin.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              2. Përdorimi i lejuar
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Të jepni informacion të saktë kur kërkoni shërbim.</li>
              <li>Të mos përdorni platformën për spam, mashtrime ose abuzim.</li>
              <li>Të respektoni komunikimin dhe sjelljen profesionale.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              3. Përgjegjësia
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Ne bëjmë përpjekje të arsyeshme për cilësi dhe përgjigje të shpejtë,
              por rezultatet mund të ndryshojnë sipas rastit. Akord.al nuk mban
              përgjegjësi për dëme indirekte ose humbje që lidhen me përdorimin e
              platformës.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              4. Ndryshime
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Ne mund t’i përditësojmë këto kushte kur të jetë e nevojshme.
              Versioni i fundit do të jetë gjithmonë i publikuar në këtë faqe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              5. Kontakt
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Për pyetje rreth kushteve, na kontaktoni nga WhatsApp në faqen kryesore.
            </p>
          </section>

          <p className="text-xs text-slate-500">
            Përditësuar së fundmi: Janar 2026
          </p>
        </div>
      </div>
    </main>
  );
}
