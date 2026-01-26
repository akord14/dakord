import Link from "next/link";

export const metadata = {
  title: "Si funksionon | Akord.al",
  description:
    "Mëso hap pas hapi si funksionon Akord.al dhe si realizohen shërbimet.",
};

export default function SiFunksiononPage() {
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
          Si funksionon Akord.al
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Akord.al është ndërtuar për ta bërë procesin sa më të thjeshtë dhe të
          besueshëm për klientët dhe partnerët.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              1. Kërkesa
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Klienti zgjedh shërbimin ose na kontakton përmes Akord.al për të
              shpjeguar nevojën e tij.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              2. Analiza
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Kërkesa analizohet nga ekipi ynë për të kuptuar saktë çfarë kërkohet
              dhe çfarë zgjidhjeje është më e përshtatshme.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              3. Realizimi
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Shërbimi realizohet nga profesionistë ose kompani të përzgjedhura,
              me komunikim të drejtpërdrejtë dhe të qartë.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              4. Ndjekja
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Nëse është e nevojshme, ne ndjekim procesin edhe pas realizimit për
              të siguruar që gjithçka ka shkuar siç duhet.
            </p>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            Gati për të nisur?
          </p>

          <a
            href="https://wa.me/355XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white hover:opacity-95 sm:w-auto"
          >
            Na kontakto në WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
