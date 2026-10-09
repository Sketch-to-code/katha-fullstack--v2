import { useBookmarks } from '../../hooks/useBookmarks';
import { MOCK_BOOKS } from '../../mock/library';

export default function BookmarksPanel() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 24, marginBottom: 20 }}>
        Bookmarks
      </h2>
      {bookmarks.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          No bookmarks yet. Open a book and tap "Bookmark this page" while reading.
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520 }}>
        {bookmarks.map((b) => {
          const book = MOCK_BOOKS.find((m) => m._id === b.documentId);
          return (
            <div
              key={b._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <div style={{ width: 32, height: 44, background: book?.coverColor || '#555', borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{book?.title || 'Unknown title'}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>
                  Page {b.page} · {new Date(b.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => removeBookmark(b._id)}
                aria-label="Remove bookmark"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 16 }}
              >
                🗑
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
