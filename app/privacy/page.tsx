import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Akord.al",
  description: "Politika e privatësisë për Akord.al.",
};

export default function PrivacyPage() {
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
          Politika e Privatësisë
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Akord.al respekton privatësinë tuaj. Kjo politikë shpjegon si
          mbledhim, përdorim dhe mbrojmë të dhënat tuaja.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              1. Çfarë të dhënash mund të mbledhim
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Emër dhe kontakt (p.sh. numër telefoni) kur na kontaktoni.</li>
              <li>Informacion i kërkesës suaj për shërbim.</li>
              <li>Informacion teknik bazë (p.sh. lloji i pajisjes/shfletuesit) për funksionimin e faqes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              2. Si i përdorim të dhënat
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Për t’ju kontaktuar dhe për t’ju ofruar shërbimin që kërkoni.</li>
              <li>Për të përmirësuar eksperiencën dhe sigurinë e platformës.</li>
              <li>Për të parandaluar abuzime dhe spam.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              3. Ndarja e të dhënave
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Ne nuk shesim të dhënat tuaja. Të dhënat mund të ndahen vetëm kur
              është e nevojshme për realizimin e shërbimit ose për arsye ligjore.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              4. Cookies
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Platforma mund të përdorë cookies për funksionalitet bazë dhe
              analitikë (nëse aktivizohet). Ju mund t’i menaxhoni cookies nga
              shfletuesi juaj.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              5. Siguria
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Ne marrim masa të arsyeshme për të mbrojtur të dhënat tuaja, por
              asnjë sistem online nuk është 100% i garantuar.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              6. Kontakt
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Për pyetje rreth privatësisë, na kontaktoni nga WhatsApp në faqen kryesore.
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
