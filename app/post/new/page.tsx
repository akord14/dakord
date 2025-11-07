'use client';
import { useState } from 'react';

type PostType = 'seeking' | 'offering';

export default function NewPostPage() {
  const [type, setType] = useState<PostType>('seeking');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description, contact })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gabim i panjohur');

      setMessage('✅ Postimi u dërgua! Statusi: "pending" për aprovim.');
      setTitle('');
      setDescription('');
      setContact('');
      setType('seeking');
    } catch (err: any) {
      setMessage('Gabim: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Krijo një postim</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>Lloji</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        >
          <option value="seeking">Kërkoj punë</option>
          <option value="offering">Ofroj punë</option>
        </select>

        <label style={{ display: 'block', marginBottom: 8 }}>Titulli</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="p.sh. Elektriçist pas pune 2 orë"
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        />

        <label style={{ display: 'block', marginBottom: 8 }}>Përshkrimi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="Detajet..."
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        />

        <label style={{ display: 'block', marginBottom: 8 }}>Kontakt</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="email / tel / WhatsApp"
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        />

        <button disabled={loading} type="submit" style={{ padding: '10px 16px' }}>
          {loading ? 'Duke dërguar...' : 'Dërgo postimin'}
        </button>
      </form>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}
