"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type PostType = "seeking" | "offering";
type WorkTime = "full_time" | "part_time" | "";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

const CITIES = [
  "Tiranë", "Durrës", "Vlorë", "Shkodër", "Fier", "Elbasan", "Korçë",
  "Berat", "Gjirokastër", "Lezhë", "Kukës", "Dibër", "Sarandë",
  "Pogradec", "Lushnjë", "Kavajë", "Laç", "Patos", "Të tjera",
];

const PROFESSIONS = [
  "Elektricist", "Instalues kamerash sigurie", "Teknik alarmi",
  "Montim kondicionerësh", "Instalues interneti / rrjeti",
  "Teknik mirëmbajtjeje", "Hidraulik", "Montues mobilerie",
  "Punëtor ndërtimi", "Murator / Suvatues", "Saldator", "Gjeometër",
  "Shofer furgoni", "Shofer kamioni", "Shofer taksie",
  "Shofer personal", "Korrier / Delivery", "Magazinier",
  "Punëtor magazine", "Ngarkim / Shkarkim", "Operator forklift",
  "Operator Call Center", "Asistent administrativ", "Sekretar/e",
  "Financier / Kontabilist", "Ekonomist", "Data Entry",
  "Shitës / Shitëse dyqani", "Konsulent shitjesh",
  "Agjent shitjesh terren", "Shërbim klienti", "IT / Support",
  "Programues / Developer", "Web Designer", "Social Media Manager",
  "Digital Marketing", "Grafik Designer", "Kamarier", "Banakier",
  "Kuzhinier", "Ndihmës kuzhinier", "Picajol", "Pastiçier",
  "Parukier/e", "Estetiste", "Manikyr / Pedikyr",
  "Punëtor fasonerie", "Punëtor pastrimi",
  "Baby-sitter / Kujdestar fëmijësh", "Kujdestar të moshuarish",
  "Arsimtar / Mësues privat", "Tjetër",
];

const CURRENCIES = ["LEK", "EUR", "USD"];
const AGES = Array.from({ length: 70 - 18 + 1 }, (_, i) => 18 + i);

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
  const [fileList, setFileList] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName.trim()) return setErrorMsg("Emri / kompania është e detyrueshme.");
    if (!profession.trim()) return setErrorMsg("Profesioni është i detyrueshëm.");
    if (!city.trim()) return setErrorMsg("Qyteti është i detyrueshëm.");
    if (!phone.trim()) return setErrorMsg("Numri i telefonit është i detyrueshëm.");
    if (!age) return setErrorMsg("Mosha është e detyrueshme.");
    if (!workTime) return setErrorMsg("Orari i punës është i detyrueshëm.");

    const supabase = getSupabaseAnon();

    let imageUrl: string | null = null;

    // ---------------------------
    // 1) NËSE KA FOTO → NGARKOJE
    // ---------------------------
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error(uploadError);
        return setErrorMsg("Nuk u ngarkua foto. Provo përsëri.");
      }

      const { data: publicUrl } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrl.publicUrl;
    }

    const title = `${fullName.trim()} — ${profession.trim()}`;
    const descParts: string[] = [];

    if (description.trim()) descParts.push(description.trim());
    descParts.push(`Qyteti: ${city}`);

    if (experience === "me") descParts.push("Me eksperiencë");
    if (experience === "pa") descParts.push("Pa eksperiencë");

    descParts.push(`Mosha: ${age} vjeç`);
    descParts.push(`Orari: ${workTime === "full_time" ? "Full time" : "Part time"}`);

    if (salary.trim()) {
      descParts.push(
        `Paga: ${salaryApprox ? "afërsisht " : ""}${salary} ${salaryCurrency}`
      );
    }

    const finalDescription = descParts.join(" | ");

    const contactParts = [];
    if (phone.trim()) contactParts.push(`Tel: ${phone.trim()}`);
    if (email.trim()) contactParts.push(`Email: ${email.trim()}`);

    const contact = contactParts.join(" • ");

    const ageNumber = age ? Number(age) : null;

    setLoading(true);

    const { error } = await supabase.from("posts").insert([
      {
        type,
        title,
        description: finalDescription,
        contact,
        status: "pending",
        age: ageNumber,
        work_time: workTime,
        city,
        image: imageUrl, // ← FOTO E RUAR
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      return setErrorMsg("Gabim gjatë ruajtjes së postimit.");
    }

    setSuccessMsg("Postimi u dërgua për aprovim!");
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
    setFileList(null);
  }

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
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 60px" }}>
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
          {/* — gjithë forma identike si më parë — */}

          {/* INPUT FOTO */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 13 }}>Foto (opsionale)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFileList(e.target.files)}
              style={{ fontSize: 13 }}
            />
          </div>

          {errorMsg && (
            <div style={{ background: "#fee2e2", color: "#b91c1c", padding: 10, borderRadius: 10 }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ background: "#dcfce7", color: "#166534", padding: 10, borderRadius: 10 }}>
              {successMsg}
            </div>
          )}

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
