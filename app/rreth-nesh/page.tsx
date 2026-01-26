import Link from "next/link";

export const metadata = {
  title: "Rreth Nesh | Akord.al",
  description:
    "Mëso më shumë rreth Akord.al, si funksionon platforma dhe pse mund të na besosh.",
};

export default function RrethNeshPage() {
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
          Rreth Nesh
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Akord.al është një platformë shërbimesh që trajton kërkesat e klientëve
          me zgjidhje reale, të menaxhuara nga ekipi dhe partnerët tanë të
          verifikuar.
        </p>

        {/* Main card */}
        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Çfarë është Akord.al?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Akord.al nuk është një marketplace klasik ku klientët zgjedhin
              profesionistë rastësorë. Ne menaxhojmë procesin nga fillimi në
              fund, duke u siguruar që çdo kërkesë të trajtohet nga persona ose
              kompani serioze.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Si funksionon?
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Klienti na kontakton përmes Akord.al.</li>
              <li>Kërkesa analizohet dhe filtrohet nga ekipi ynë.</li>
              <li>Shërbimi realizohet nga profesionistë të përzgjedhur.</li>
              <li>Komunikimi dhe cilësia monitorohen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Pse të na besosh?
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Fokus në cilësi, jo sasi.</li>
              <li>Partnerë dhe shërbime të verifikuara.</li>
              <li>Përgjigje të shpejta dhe komunikim korrekt.</li>
              <li>Qasje profesionale dhe transparente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Misioni ynë
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Të krijojmë një mënyrë më të thjeshtë dhe më të besueshme për të
              gjetur dhe ofruar shërbime profesionale, duke ulur konfuzionin dhe
              humbjen e kohës për të dyja palët.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            Ke pyetje ose dëshiron të bashkëpunosh me ne?
          </p>

          <a
            href="https://wa.me/355695111179"
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
