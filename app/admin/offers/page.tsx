import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

function waLink(phone: string, text: string) {
  const p = phone.replace(/[^\d+]/g, "");
  const clean = p.startsWith("+") ? p.slice(1) : p; // wa.me pa "+"
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default async function AdminOffersPage() {
  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from("offer_requests")
    .select(
      "id, created_at, service_text, details, city, budget_min, budget_max, timeline, phone, status"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Oferta Requests
        </h1>

        <Link className="text-sm font-bold text-blue-700 underline" href="/admin">
          ← Admin
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error.message}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {(data || []).map((r: any) => {
          const summary = [
            r.service_text ? `Shërbimi: ${r.service_text}` : null,
            r.city ? `Qyteti: ${r.city}` : null,
            r.timeline ? `Afati: ${r.timeline}` : null,
            r.budget_min || r.budget_max
              ? `Buxheti: ${r.budget_min || "-"} - ${r.budget_max || "-"}`
              : null,
            r.details ? `Detaje: ${r.details}` : null,
          ]
            .filter(Boolean)
            .join("\n");

          const msg = `Përshëndetje! Pash kërkesën tënde për ofertë.\n${summary || ""}\n\nMund të më japësh edhe 1-2 detaje?`;

          return (
            <div
              key={r.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {r.phone}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {new Date(r.created_at).toLocaleString()}{" "}
                    {r.status ? `• ${r.status}` : ""}
                  </div>
                </div>

                <a
                  className="inline-flex items-center justify-center rounded-xl bg-[#1f5b8f] px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
                  href={waLink(r.phone, msg)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Hap WhatsApp
                </a>
              </div>

              <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                {summary || "Pa detaje (vetëm numri)."}
              </div>
            </div>
          );
        })}

        {!error && (!data || data.length === 0) && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Nuk ka ende kërkesa.
          </div>
        )}
      </div>
    </main>
  );
}
