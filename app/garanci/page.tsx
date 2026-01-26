import Link from "next/link";

export const metadata = {
  title: "Garanci për shërbimet | Akord.al",
  description:
    "Si e garanton Akord.al cilësinë dhe si trajtohen kërkesat për shërbime.",
};

export default function GaranciPage() {
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
          Garanci për shërbimet
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Akord.al fokusohet te cilësia, komunikimi dhe transparenca. Kjo faqe
          shpjegon çfarë nënkuptojmë me “garanci” dhe si trajtojmë çdo kërkesë.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Çfarë do të thotë garanci?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Garancia nënkupton që kërkesa juaj nuk lihet pa zgjidhje. Ne
              ndërhyjmë nëse ka paqartësi, vonesa ose probleme komunikimi gjatë
              procesit të shërbimit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Si e ruajmë cilësinë
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Filtrim i kërkesave dhe shërbimeve.</li>
              <li>Përcjellje vetëm te partnerë dhe profesionistë seriozë.</li>
              <li>Komunikim i qartë për pritshmëritë.</li>
              <li>Ndjekje e procesit kur është e nevojshme.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900">
              Çfarë nuk mbulon garancia
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Garancia nuk nënkupton rimbursim automatik dhe nuk mbulon raste jashtë
              kontrollit tonë, si ndryshime të kërkesës ose kushte teknike të
              paparashikuara. Çdo rast trajtohet individualisht.
            </p>
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            Ke pyetje rreth një shërbimi aktiv?
          </p>

          <a
            href="https://wa.me/355XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-extrabold text-white hover:opacity-95 sm:w-auto"
          >
            Shkruaj në WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
