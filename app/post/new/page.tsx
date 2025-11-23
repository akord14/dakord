"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type PostType = "seeking" | "offering";
type WorkTime = "full_time" | "part_time" | "";

// -----------------------
// Supabase
// -----------------------
function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

// -----------------------
// Static Data
// -----------------------
const CITIES = [
  "Tiranë",
  "Durrës",
  "Vlorë",
  "Shkodër",
  "Fier",
  "Elbasan",
  "Korçë",
  "Berat",
  "Gjirokastër",
  "Lezhë",
  "Kukës",
  "Dibër",
  "Sarandë",
  "Pogradec",
  "Lushnjë",
  "Kavajë",
  "Laç",
  "Patos",
  "Të tjera",
];

const PROFESSIONS = [
  "Elektricist",
  "Instalues kamerash sigurie",
  "Teknik alarmi",
  "Montim kondicionerësh",
  "Instalues interneti / rrjeti",
  "Teknik mirëmbajtjeje",
  "Hidraulik",
  "Montues mobilerie",
  "Punëtor ndërtimi",
  "Murator / Suvatues",
  "Saldator",
  "Gjeometër",
  "Shofer furgoni",
  "Shofer kamioni",
  "Shofer taksie",
  "Shofer personal",
  "Korrier / Delivery",
  "Magazinier",
  "Punëtor magazine",
  "Ngarkim / Shkarkim",
  "Operator forklift",
  "Operator Call Center",
  "Asistent administrativ",
  "Sekretar/e",
  "Financier / Kontabilist",
  "Ekonomist",
  "Data Entry",
  "Shitës / Shitëse dyqani",
  "Konsulent shitjesh",
  "Agjent shitjesh terren",
  "Shërbim klienti",
  "IT / Support",
  "Programues / Developer",
  "Web Designer",
  "Social Media Manager",
  "Digital Marketing",
  "Grafik Designer",
  "Kamarier",
  "Banakier",
  "Kuzhinier",
  "Ndihmës kuzhinier",
  "Picajol",
  "Pastiçier",
  "Parukier/e",
  "Estetiste",
  "Manikyr / Pedikyr",
  "Punëtor fasonerie",
  "Punëtor pastrimi",
  "Baby-sitter / Kujdestar fëmijësh",
  "Kujdestar të moshuarish",
  "Arsimtar / Mësues privat",
  "Tjetër",
];

const CURRENCIES = ["LEK", "EUR", "USD"];
// Mosha 18–70
const AGES = Array.from({ length: 53 }, (_, i) => 18 + i);

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------
export default function NewPostPage() {
  const [type, setType] = useState<PostType>("seeking");
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState<"me" | "pa" | "">("");
  const [age, setAge] = useState<string>("");
  const [workTime, setWorkTime] = useState<WorkTime>("");

  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [description, setDescription] = useState("");

  const [salary, setSalary] = useState("");
  const [salaryApprox, setSalaryApprox] = useState(false);
  const [salaryCurrency, setSalaryCurrency] = useState("LEK");

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validimet bazë
    if (!fullName.trim())
      return setErrorMsg("Emri / kompania është e detyrueshme.");
    if (!profession.trim())
      return setErrorMsg("Profesioni është i detyrueshëm.");
    if (!city.trim()) return setErrorMsg("Qyteti është i detyrueshëm.");
    if (!phone.trim())
      return setErrorMsg("Numri i telefonit është i detyrueshëm.");
    if (!age) return setErrorMsg("Mosha është e detyrueshme.");
    if (!workTime) return setErrorMsg("Orari i punës është i detyrueshëm.");

    const title = `${fullName.trim()} — ${profession.trim()}`;

    // Ndërtimi i description
    const descParts: string[] = [];

    if (description.trim()) descParts.push(description.trim());
    descParts.push(`Qyteti: ${city}`);

    if (experience === "me") descParts.push("Me eksperiencë");
    if (experience === "pa") descParts.push("Pa eksperiencë");

    descParts.push(`Mosha: ${age} vjeç`);
    descParts.push(
      `Orari: ${workTime === "full_time" ? "Full time" : "Part time"}`
    );

    if (salary.trim()) {
      descParts.push(
        `Paga: ${salaryApprox ? "afërsisht " : ""}${salary} ${salaryCurrency}`
      );
    }

    // --------------------------------------------------
// FOTO → Supabase Storage (bucket: post-images)
// --------------------------------------------------
const supabase = getSupabaseAnon();
let imageUrl: string | null = null;

if (file) {
  const ext = file.name.split(".").pop() || "jpg";

  const base = file.name.replace(/\.[^/.]+$/, ""); // heq .png / .jpg
  const safeName = base.replace(/\s+/g, "-").toLowerCase();

  const filePath = `${Date.now()}-${safeName}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error(uploadError);
    setErrorMsg("Fotoja nuk u ngarkua. Provo përsëri pa foto ose më vonë.");
    return;
  }

  const { data: publicData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  imageUrl = publicData.publicUrl;
}


    // --------------------------------------------------
    // Kontaktet
    // --------------------------------------------------
    const contactParts: string[] = [];
    if (phone.trim()) contactParts.push(`Tel: ${phone.trim()}`);
    if (email.trim()) contactParts.push(`Email: ${email.trim()}`);

    const contact = contactParts.join(" • ");
    const finalDescription = descParts.join(" | ");
    const ageNumber = age ? Number(age) : null;

    setLoading(true);

    try {
      const { error } = await supabase.from("posts").insert([
  {
    type,
    title,
    description: finalDescription,
    contact,
    status: "pending",
    age: ageNumber,
    work_time: workTime || null,
    city,
    image: imageUrl,

    // 🔵 SHTOHEN KËTO (shumë të rëndësishme)
    payment: salary || null,
    payment_currency: salaryCurrency || null,
    profession: profession || null,
  },
]);


      if (error) {
        console.error(error);
        setErrorMsg("Gabim gjatë ruajtjes së postimit.");
      } else {
        setSuccessMsg("Postimi u dërgua për aprovim!");

        // Pastro formën
        setFullName("");
        setProfession("");
        setExperience("");
        setAge("");
        setWorkTime("");
        setCity("");
        setPhone("");
        setEmail("");
        setDescription("");
        setSalary("");
        setSalaryApprox(false);
        setSalaryCurrency("LEK");
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Gabim i papritur. Provo përsëri.");
    }

    setLoading(false);
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily: "system-ui, sans-serif",
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "24px 16px 60px",
        }}
      >
        {/* KTHEHU MBRAPA */}
        <a
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 12,
            fontSize: 14,
            color: "#2563eb",
            textDecoration: "none",
          }}
        >
          ← Kthehu mbrapa
        </a>

        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
          Krijo postimin tënd
        </h1>

        <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 24 }}>
          Plotëso të dhënat. Postimi shfaqet vetëm pasi ta aprovojë administratori.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 18px 40px rgba(0,0,0,0.07)",
            display: "grid",
            gap: 20,
          }}
        >
          {/* LLOJI */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 13 }}>
              Lloji i postimit
            </label>

            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              {["seeking", "offering"].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setType(v as PostType)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border:
                      type === v ? "2px solid #0ea5e9" : "1px solid #d1d5db",
                    background: type === v ? "#e0f2fe" : "white",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {v === "seeking" ? "Kërkoj punë" : "Ofroj punë"}
                </button>
              ))}
            </div>
          </div>

          {/* EMRI */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 13 }}>
              Emër Mbiemër / Kompania *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="p.sh. Ismet Cungu / Alba Security"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontSize: 14,
              }}
            />
          </div>

          {/* PROFESIONI + EKSPERIENCA */}
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Profesioni *
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              >
                <option value="">Zgjidh profesionin</option>
                {PROFESSIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Eksperienca
              </label>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setExperience("me")}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border:
                      experience === "me"
                        ? "2px solid #0ea5e9"
                        : "1px solid #d1d5db",
                    background: experience === "me" ? "#e0f2fe" : "white",
                    cursor: "pointer",
                  }}
                >
                  Me eksperiencë
                </button>

                <button
                  type="button"
                  onClick={() => setExperience("pa")}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border:
                      experience === "pa"
                        ? "2px solid #0ea5e9"
                        : "1px solid #d1d5db",
                    background: experience === "pa" ? "#e0f2fe" : "white",
                    cursor: "pointer",
                  }}
                >
                  Pa eksperiencë
                </button>
              </div>
            </div>
          </div>

          {/* MOSHA + ORARI */}
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>Mosha *</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              >
                <option value="">Zgjidh moshën</option>
                {AGES.map((a) => (
                  <option key={a} value={a}>
                    {a} vjeç
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Orari i punës *
              </label>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setWorkTime("full_time")}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border:
                      workTime === "full_time"
                        ? "2px solid #0ea5e9"
                        : "1px solid #d1d5db",
                    background: workTime === "full_time" ? "#e0f2fe" : "white",
                    cursor: "pointer",
                  }}
                >
                  Full time
                </button>

                <button
                  type="button"
                  onClick={() => setWorkTime("part_time")}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border:
                      workTime === "part_time"
                        ? "2px solid #0ea5e9"
                        : "1px solid #d1d5db",
                    background: workTime === "part_time" ? "#e0f2fe" : "white",
                    cursor: "pointer",
                  }}
                >
                  Part time
                </button>
              </div>
            </div>
          </div>

          {/* QYTETI + TEL + EMAIL */}
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>Qyteti *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              >
                <option value="">Zgjidh qytetin</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Numër telefoni *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="p.sh. 068 00 00 000"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Email (opsionale)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="p.sh. info@kompania.al"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* PËRSHKRIMI */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 13 }}>
              Përshkrimi i punës (opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Shkruaj detajet e punës…"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                fontSize: 14,
                resize: "vertical",
              }}
            />
          </div>

          {/* PAGA */}
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>
                Paga (opsionale)
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="p.sh. 60 000 / 4.5 orë"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={salaryApprox}
                onChange={(e) => setSalaryApprox(e.target.checked)}
              />
              Afërsisht
            </label>

            <div>
              <label style={{ fontWeight: 600, fontSize: 13 }}>Monedha</label>
              <select
                value={salaryCurrency}
                onChange={(e) => setSalaryCurrency(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FOTO */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 13 }}>
              Foto (opsionale)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ fontSize: 13 }}
            />

            <p
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginTop: 4,
              }}
            >
              Nëse nuk ngarkon foto, përdoret automatikisht një ikonë sipas
              profesionit.
            </p>
          </div>

          {/* ERROR */}
          {errorMsg && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* SUCCESS */}
          {successMsg && (
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              {successMsg}
            </div>
          )}

          {/* POSTO */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9, #0f172a)",
              color: "white",
              fontWeight: 600,
              fontSize: 15,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
              border: "none",
            }}
          >
            {loading ? "Duke dërguar…" : "Posto"}
          </button>
        </form>
      </div>
    </main>
  );
}
