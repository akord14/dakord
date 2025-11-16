"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type PostType = "seeking" | "offering";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

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
  "Te tjera",
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

  // Transport dhe shoferë
  "Shofer furgoni",
  "Shofer kamioni",
  "Shofer taksie",
  "Shofer personal",
  "Korrier / Delivery",

  // Magazinë dhe fizik
  "Magazinier",
  "Punëtor magazine",
  "Ngarkim / Shkarkim",
  "Operator forklift",

  // Zyrë dhe call center
  "Operator Call Center",
  "Asistent administrativ",
  "Sekretar/e",
  "Financier / Kontabilist",
  "Ekonomist",
  "Data Entry",

  // Shitje & shërbim klienti
  "Shitës / Shitëse dyqani",
  "Konsulent shitjesh",
  "Agjent shitjesh terren",
  "Shërbim klienti",

  // IT & marketing
  "IT / Support",
  "Programues / Developer",
  "Web Designer",
  "Social Media Manager",
  "Digital Marketing",
  "Grafik Designer",

  // Gastronomi & shërbim
  "Kamarier",
  "Banakier",
  "Kuzhinier",
  "Ndihmës kuzhinier",
  "Picajol",
  "Pastiçier",

  // Bukuri & kujdes
  "Parukier/e",
  "Estetiste",
  "Manikyr / Pedikyr",

  // Të tjera të përgjithshme
  "Punëtor fasonerie",
  "Punëtor pastrimi",
  "Baby-sitter / Kujdestar fëmijësh",
  "Kujdestar të moshuarish",
  "Arsimtar / Mësues privat",
  "Tjetër",
];

const CURRENCIES = ["LEK", "EUR", "USD"];

export default function NewPostPage() {
  const [type, setType] = useState<PostType>("seeking");
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState<"me" | "pa" | "">("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryApprox, setSalaryApprox] = useState(false);
  const [salaryCurrency, setSalaryCurrency] = useState("LEK");
  const [fileList, setFileList] = useState<FileList | null>(null); // UI-only për tani

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // VALIDIME sipas kërkesës tënde:
    if (!fullName.trim()) {
      setErrorMsg("Emri / emri i kompanisë është i detyrueshëm.");
      return;
    }
    if (!profession.trim()) {
      setErrorMsg("Profesioni është i detyrueshëm.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("Qyteti është i detyrueshëm.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Numri i telefonit është i detyrueshëm.");
      return;
    }

    // ndërtojmë titullin dhe përshkrimin për databazën ekzistuese
    const title = `${fullName.trim()} — ${profession.trim()}`;

    const descParts: string[] = [];

    if (description.trim()) {
      descParts.push(description.trim());
    }

    descParts.push(`Qyteti: ${city}`);

    if (experience === "me") {
      descParts.push("Me eksperiencë");
    } else if (experience === "pa") {
      descParts.push("Pa eksperiencë");
    }

    if (salary.trim()) {
      const approxLabel = salaryApprox ? "afërsisht " : "";
      descParts.push(`Paga: ${approxLabel}${salary.trim()} ${salaryCurrency}`);
    }

    if (fileList && fileList.length > 0) {
      descParts.push(`Foto: ${fileList.length} skedar/e (ruajtja e fotove do shtohet së shpejti)`);
    } else {
      descParts.push("Foto: ikonë automatike sipas profesionit");
    }

    const finalDescription = descParts.join(" | ");

    const contactParts: string[] = [];
    if (phone.trim()) contactParts.push(`Tel: ${phone.trim()}`);
    if (email.trim()) contactParts.push(`Email: ${email.trim()}`);
    const contact = contactParts.join(" • ");

    setLoading(true);
    try {
      const supabase = getSupabaseAnon();
      const { error } = await supabase.from("posts").insert([
        {
          type,
          title,
          description: finalDescription,
          contact,
          status: "pending",
        },
      ]);

      if (error) {
        console.error(error);
        setErrorMsg("Diçka shkoi keq gjatë ruajtjes së postimit. Provo përsëri.");
        return;
      }

      setSuccessMsg("Postimi u dërgua për aprovimin e adminit.");
      // reseto formën
      setFullName("");
      setProfession("");
      setExperience("");
      setCity("");
      setPhone("");
      setEmail("");
      setDescription("");
      setSalary("");
      setSalaryApprox(false);
      setSalaryCurrency("LEK");
      setFileList(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ndodhi një gabim i papritur. Provo përsëri.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 16px 56px",
        }}
      >
        <h1
          style={{
            fontSize: 26,
            marginBottom: 8,
          }}
        >
          Krijo postimin tënd
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#4b5563",
            marginBottom: 24,
          }}
        >
          Plotëso të dhënat e mëposhtme. Postimi do të dërgohet për moderim dhe do të
          shfaqet vetëm pasi të miratohet nga administratori.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
            display: "grid",
            gap: 16,
          }}
        >
          {/* Lloji i postimit */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Lloji i postimit
            </label>
            <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
              <button
                type="button"
                onClick={() => setType("seeking")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border:
                    type === "seeking" ? "2px solid #0ea5e9" : "1px solid #d1d5db",
                  background: type === "seeking" ? "#e0f2fe" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                Kërkoj punë
              </button>
              <button
                type="button"
                onClick={() => setType("offering")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border:
                    type === "offering" ? "2px solid #0ea5e9" : "1px solid #d1d5db",
                  background: type === "offering" ? "#e0f2fe" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                Ofroj punë
              </button>
            </div>
          </div>

          {/* Emri / kompania */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Emër Mbiemër / Emri i kompanisë *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="p.sh. Ismet Cungu / Alba Security sh.p.k."
              style={{
                width: "100%",
                padding: "9px 11px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontSize: 14,
              }}
            />
          </div>

          {/* Profesioni + Eksperienca */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Profesioni *
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 11px",
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
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Eksperienca
              </label>
              <div style={{ display: "flex", gap: 8, fontSize: 14 }}>
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
                    background: experience === "me" ? "#e0f2fe" : "#ffffff",
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
                    background: experience === "pa" ? "#e0f2fe" : "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Pa eksperiencë
                </button>
              </div>
            </div>
          </div>

          {/* Qyteti, Tel, Email */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1.2fr) minmax(0, 1.5fr)",
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Qyteti *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 11px",
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
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Numër telefoni *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="p.sh. 068 00 00 000"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Email (opsional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="p.sh. info@kompania.al"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* Përshkrimi */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Përshkrimi i punës (opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Shkruaj detajet kryesore për punën ose profilin…"
              style={{
                width: "100%",
                padding: "9px 11px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                fontSize: 14,
                resize: "vertical",
              }}
            />
          </div>

          {/* Paga */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Paga (opsionale)
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="p.sh. 60 000, 4.5 / orë, etj."
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
            </div>

            <div style={{ marginTop: 22 }}>
              <label style={{ fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={salaryApprox}
                  onChange={(e) => setSalaryApprox(e.target.checked)}
                  style={{ marginRight: 6 }}
                />
                Afërsisht
              </label>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Monedha
              </label>
              <select
                value={salaryCurrency}
                onChange={(e) => setSalaryCurrency(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 11px",
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

          {/* Foto */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Foto (opsionale)
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFileList(e.target.files)}
              style={{ fontSize: 13 }}
            />
            <p
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              Mund të ngarkosh 1 ose disa foto. Nëse nuk ngarkon asnjë, do përdoret
              automatikisht një ikon për profesionin.
            </p>
          </div>

          {/* Mesazhe gabimi / suksesi */}
          {errorMsg && (
            <div
              style={{
                fontSize: 13,
                color: "#b91c1c",
                background: "#fee2e2",
                borderRadius: 10,
                padding: "8px 10px",
              }}
            >
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                fontSize: 13,
                color: "#166534",
                background: "#dcfce7",
                borderRadius: 10,
                padding: "8px 10px",
              }}
            >
              {successMsg}
            </div>
          )}

          {/* Butoni POSTO */}
          <div style={{ marginTop: 4 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 40%, #0f172a 100%)",
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Duke dërguar…" : "Posto"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
