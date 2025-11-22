// app/post/new/page.tsx

import Link from "next/link";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* HEADER */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Krijo postim të ri
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Plotëso fushat më poshtë. Postimi do të shfaqet pasi të aprovohet
              nga admini.
            </p>
          </div>

          <Link
            href="/post"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            ← Kthehu te postimet
          </Link>
        </header>

        {/* FORMA E POSTIMIT */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* 
            Këtu supozojmë që ke një API route: /app/api/posts/route.ts
            që pranon këto fusha me method=POST.
          */}
          <form action="/api/posts" method="post" className="space-y-5">
            {/* Type: seeking / offering */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Lloji i postimit
              </label>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="seeking"
                    defaultChecked
                    className="h-4 w-4"
                  />
                  <span>Kërkoj punë</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="offering"
                    className="h-4 w-4"
                  />
                  <span>Ofroj punë</span>
                </label>
              </div>
            </div>

            {/* Titulli */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="title">
                Titulli i postimit
              </label>
              <input
                id="title"
                name="title"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="p.sh. Elektriçist me eksperiencë kërkon punë"
              />
            </div>

            {/* Qyteti */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="city">
                Qyteti (opsionale)
              </label>
              <input
                id="city"
                name="city"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Tiranë, Durrës, etj."
              />
            </div>

            {/* Profesioni */}
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-slate-800"
                htmlFor="profession"
              >
                Profesioni (opsionale)
              </label>
              <input
                id="profession"
                name="profession"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Elektriçist, Operator, Kamerier, etj."
              />
            </div>

            {/* Mosha */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="age">
                Mosha (opsionale)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={14}
                max={99}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="p.sh. 28"
              />
            </div>

            {/* Orari i punës: full_time / part_time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Orari i punës
              </label>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="work_time"
                    value="full_time"
                    defaultChecked
                    className="h-4 w-4"
                  />
                  <span>Full time</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="work_time"
                    value="part_time"
                    className="h-4 w-4"
                  />
                  <span>Part time</span>
                </label>
              </div>
            </div>

            {/* Përshkrimi */}
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-slate-800"
                htmlFor="description"
              >
                Përshkrimi
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Shkruaj detajet kryesore për punën ose kandidatin..."
              />
            </div>

            {/* Kontakti */}
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-slate-800"
                htmlFor="contact"
              >
                Kontakti (tel / WhatsApp / email)
              </label>
              <input
                id="contact"
                name="contact"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="p.sh. +355 6X XXX XXXX (WhatsApp)"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90"
              >
                Publiko postimin për moderim
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
