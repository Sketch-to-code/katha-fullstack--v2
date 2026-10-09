import { useState } from 'react';
import { useNotes } from '../../hooks/useNotes';

export default function NotesPanel() {
  const { notes, addNote, removeNote } = useNotes();
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');

  const filtered = notes.filter((n) => n.body.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 24, marginBottom: 16 }}>
        Notes
      </h2>

      <input
        placeholder="Search your notes…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '9px 12px',
          borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
          color: 'var(--text)',
          marginBottom: 20,
          fontSize: 13.5,
        }}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 24, maxWidth: 480 }}>
        <input
          placeholder="Write a note for the current page…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{
            flex: 1,
            padding: '9px 12px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            color: 'var(--text)',
            fontSize: 13.5,
          }}
        />
        <button
          onClick={() => {
            if (!draft.trim()) return;
            addNote(1, null, draft.trim());
            setDraft('');
          }}
          style={{
            padding: '9px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--accent-text)',
            fontSize: 13.5,
          }}
        >
          Add note
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520 }}>
        {filtered.map((n) => (
          <div
            key={n._id}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '12px 16px',
            }}
          >
            <p style={{ margin: 0, fontSize: 13.5 }}>{n.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Page {n.page}</span>
              <button
                onClick={() => removeNote(n._id)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12 }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
