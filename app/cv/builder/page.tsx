"use client";
import { useState } from "react";

export default function CVBuilder() {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">KRIJO CV</h1>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-slate-300">Emri & Mbiemri</span>
            <input className="px-3 py-2 rounded bg-black/20 border border-white/10" value={fullName} onChange={e=>setFullName(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-slate-300">Titulli</span>
            <input className="px-3 py-2 rounded bg-black/20 border border-white/10" value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <button className="btn btn-primary" type="button">Shkarko PDF (placeholder)</button>
        </div>
      </div>
      <div className="card p-8">
        <h2 className="text-xl font-semibold">Preview</h2>
        <p className="mt-2 text-slate-400">Do të shfaqet një preview i CV-së këtu. Për momentin është placeholder.</p>
        <div className="mt-6 p-4 rounded border border-white/10">
          <div className="text-lg font-bold">{fullName || "Emri Juaj"}</div>
          <div className="text-slate-400">{title || "Titulli juaj profesional"}</div>
        </div>
      </div>
    </div>
  );
}
