// app/components/ProfessionIcon.tsx
import Image from "next/image";

type ProfessionIconProps = {
  /** Tekst nga i cili do nxjerrim profesionin (titull + pershkrim) */
  text: string;
};

const PROF_TO_IMG: Record<string, string> = {
  shofer: "/images/professions/driver.svg",
  infermier: "/images/professions/nurse.svg",
  elektri: "/images/professions/electrician.svg", // elektrikist, elektricist
  kuzhin: "/images/professions/cook.svg",
  pastrim: "/images/professions/cleaner.svg",
  ndertim: "/images/professions/builder.svg",
  // fallback
  other: "/images/professions/other.svg",
};

function pickIconPath(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes("shofer") || lower.includes("patentë") || lower.includes("patente"))
    return PROF_TO_IMG.shofer;

  if (lower.includes("infermier")) return PROF_TO_IMG.infermier;

  if (lower.includes("elektri")) return PROF_TO_IMG.elektri; // elektrikist / elektricist

  if (lower.includes("kuzhin") || lower.includes("guzhin")) return PROF_TO_IMG.kuzhin;

  if (lower.includes("pastrim") || lower.includes("pastruese")) return PROF_TO_IMG.pastrim;

  if (lower.includes("ndërtim") || lower.includes("ndertim") || lower.includes("murator"))
    return PROF_TO_IMG.ndertim;

  return PROF_TO_IMG.other;
}

export default function ProfessionIcon({ text }: ProfessionIconProps) {
  const src = pickIconPath(text);

  return (
    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
      <Image src={src} alt="Ikona e profesionit" width={40} height={40} />
    </div>
  );
}
