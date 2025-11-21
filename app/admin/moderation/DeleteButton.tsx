"use client";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  async function handleDelete() {
    if (!confirm("A je i sigurt që dëshiron ta fshish këtë postim?")) return;

    const res = await fetch("/api/delete-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Posti u fshi me sukses.");
      window.location.reload();
    } else {
      alert("Ndodhi një gabim gjatë fshirjes.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
    >
      Fshije
    </button>
  );
}
