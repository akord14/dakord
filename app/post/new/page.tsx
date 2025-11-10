"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const PROFESIONE = [
  "Elektriçist",
  "Hidraulik",
  "Teknik CCTV/Alarm",
  "IT / Developer",
  "Shofer",
  "Punëtor ndërtimi",
  "Përkujdesje fëmijësh",
  "Pastrim",
  "Kuzhinier / Ndihmës kuzhine",
  "Shitës / Market",
  "Kamerier",
  "Kontabilist",
  "Marketing / Social Media",
  "Operator telefonie/kompjuterik",
  "Tjetër…",
];
// PROFESION -> emri i skedarit të ilustrimit
const PROF_TO_IMG: Record<string, string> = {
  "Shofer": "driver.svg",
  "Elektriçist": "electrician.svg",
  "Hidraulik": "plumber.svg",
  "Teknik CCTV/Alarm": "technician.svg",
  "IT / Developer": "developer.svg",
  "Shitës / Market": "shop.svg",
  "Kuzhinier / Ndihmës kuzhine": "chef.svg",
  "Pastrim": "cleaner.svg",
  "Kamerier": "waiter.svg",
  "Punëtor ndërtimi": "builder.svg",
  "Kontabilist": "other.svg",
  "Marketing / Social Media": "other.svg",
  "Përkujdesje fëmijësh": "other.svg",
  "Operator telefonie/kompjuterik": "operator.svg",
  "Tjetër…": "other.svg",
};

// Kthen path-in e fotos për DB
const imgFor = (profession: string) =>
  `/images/professions/${PROF_TO_IMG[profession] ?? "other.svg"}`;

export default function NewPostPage() {
  const router = useRouter();
  const [type, setType] = useState<"seeking" | "offering">("seeking");

  // 1) Emër Mbiemër
  const [fullName, setFullName] = useState("");

  // 2) Profesioni (dropdown)
  const [profession, setProfession] = useState("");

  // 3) Pagesa + monedha + (afërsisht)
  const [payment, setPayment] = useState(""); // vetëm shifra/tekst i lirë (p.sh. 700 / muaj)
  const [paymentCurrency, setPaymentCurrency] = useState<"EUR" | "USD" | "ALL">("EUR");
  const [isApprox, setIsApprox] = useState(true);

  // 4) Nr. telefoni
  const [phone, setPhone] = useState("");
  // 5) Email
  const [email, setEmail] = useState("");

  // 6) Përshkrimi
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const image = imgFor(profession);


    // ✅ Validime të vogla sipas porosisë
    if (!fullName.trim()) return alert("Shkruaj Emër Mbiemër.");
    if (!profession) return alert("Zgjidh një profesion.");
    if (!phone.trim() && !email.trim()) {
      return alert("Vendos të paktën një kontakt: numër telefoni ose email.");
    }

    setLoading(true);

    // Bashko për kolonat ekzistuese në DB
    const title = `${fullName} — ${profession}`.trim();
    const paymentStr = payment ? `${payment}${isApprox ? " (afërsisht)" : ""}` : "";
    const contactParts = [];
    if (phone.trim()) contactParts.push(phone.trim());
    if (email.trim()) contactParts.push(email.trim());
    const contact = contactParts.join("; ");

    const { error } = await supabase.from("posts").insert([
      {
        type,                              // seeking | offering
        title,                             // Emër Mbiemër — Profesioni
        description,                       // më shumë informacion
        contact,                           // tel; email
        payment: paymentStr,               // p.sh. 700 (afërsisht)
        payment_currency: paymentCurrency, // EUR / USD / ALL
        status: "pending",
        profession,   // NEW
        image,        // NEW -> /images/professions/driver.svg

      },
    ]);

    setLoading(false);
    if (error) return alert("Gabim gjatë dërgimit: " + error.message);
    router.push("/success");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Krijo Postimin e Ri</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-lg">
        {/* Tipi: Kërkoj / Ofroj */}
        <div className="flex justify-center gap-3">
          {(["seeking","offering"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-xl border transition ${
                type === t ? "bg-blue-600 text-white border-blue-600" : "hover:bg-blue-50"
              }`}
            >
              {t === "seeking" ? "Kërkoj Punë" : "Ofroj Punë"}
            </button>
          ))}
        </div>

        {/* 1) Emër Mbiemër */}
        <input
          type="text"
          placeholder="Emër Mbiemër"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        {/* 2) Profesioni (dropdown) */}
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        >
          <option value="" disabled>
            Zgjidh profesionin / kategorinë
          </option>
          {PROFESIONE.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* 3) Pagesa + monedha + afërsisht (siç ta pëlqeve) */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder={`Pagesa që ${type === "seeking" ? "kërkoj" : "ofroj"}`}
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
          <select
            value={paymentCurrency}
            onChange={(e) => setPaymentCurrency(e.target.value as "EUR" | "USD" | "ALL")}
            className="w-28 border rounded-xl p-3"
            aria-label="Monedha"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="ALL">Lek</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isApprox}
            onChange={(e) => setIsApprox(e.target.checked)}
          />
          Shënoje si “afërsisht”
        </label>

        {/* 4) Nr. telefoni */}
        <input
          type="text"
          placeholder="Numri i telefonit"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        {/* 5) Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        {/* 6) Përshkrimi (më shumë informacion) */}
        <textarea
          placeholder="Përshkrimi (më shumë informacion)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-xl p-3 h-32"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Duke dërguar..." : "Dërgo për miratim"}
        </button>
      </form>
    </div>
  );
}
