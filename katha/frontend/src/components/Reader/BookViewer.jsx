import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RENDER_STRATEGIES } from '../../strategies/renderStrategies';
import AIPanel from './AIPanel';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../hooks/useBookmarks';

const SOUNDSCAPES = ['none', 'rain', 'ocean', 'forest', 'lofi'];

export default function BookViewer() {
  const { id } = useParams();
  const { readingMode, setReadingMode } = useTheme();
  const [renderMode, setRenderMode] = useState('flipbook');
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const [soundscape, setSoundscape] = useState('none');
  const [selectedText, setSelectedText] = useState(null);
  const { bookmarks, addBookmark } = useBookmarks(id);

  const Renderer = RENDER_STRATEGIES[renderMode];
  const isBookmarked = bookmarks.some((b) => b.page === page);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {['leisure', 'academic'].map((mode) => (
            <button
              key={mode}
              onClick={() => setReadingMode(mode)}
              style={{
                padding: '7px 14px',
                fontSize: 13,
                border: 'none',
                textTransform: 'capitalize',
                background: readingMode === mode ? 'var(--accent)' : 'transparent',
                color: readingMode === mode ? 'var(--accent-text)' : 'var(--text)',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {['flipbook', 'scroll'].map((mode) => (
            <button
              key={mode}
              onClick={() => setRenderMode(mode)}
              style={{
                padding: '7px 14px',
                fontSize: 13,
                border: 'none',
                textTransform: 'capitalize',
                background: renderMode === mode ? 'var(--gold)' : 'transparent',
                color: renderMode === mode ? '#1a1409' : 'var(--text)',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={() => setZoom((z) => Math.max(0.75, z - 0.1))} style={zoomBtn}>
            −
          </button>
          <span style={{ fontSize: 13, width: 40, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))} style={zoomBtn}>
            +
          </button>
        </div>

        <select
          value={soundscape}
          onChange={(e) => setSoundscape(e.target.value)}
          style={{
            padding: '7px 10px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            color: 'var(--text)',
            fontSize: 13,
          }}
        >
          {SOUNDSCAPES.map((s) => (
            <option key={s} value={s}>
              {s === 'none' ? 'No soundscape' : s}
            </option>
          ))}
        </select>

        <button
          onClick={() => addBookmark(page)}
          disabled={isBookmarked}
          style={{
            marginLeft: 'auto',
            padding: '7px 14px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: isBookmarked ? 'var(--accent-soft)' : 'var(--bg-elevated)',
            fontSize: 13,
          }}
        >
          {isBookmarked ? '★ Bookmarked' : '☆ Bookmark this page'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Renderer
              zoom={zoom}
              page={page}
              onSelectText={readingMode === 'academic' ? setSelectedText : undefined}
            />
          </div>
        </div>

        {readingMode === 'academic' && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <AIPanel selectedText={selectedText} onClose={() => setSelectedText(null)} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 2))} style={zoomBtn}>
          ← Prev
        </button>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 2)} style={zoomBtn}>
          Next →
        </button>
      </div>
    </div>
  );
}

const zoomBtn = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: '1px solid var(--border)',
  background: 'var(--bg-elevated)',
  fontSize: 14,
};
