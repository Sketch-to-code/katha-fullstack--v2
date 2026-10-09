import { useTheme } from '../../context/ThemeContext';

const THEMES = [
  { key: 'light', label: 'Light', bg: '#f4f2ec', fg: '#211d17' },
  { key: 'sepia', label: 'Sepia', bg: '#e7ddc3', fg: '#3b2f22' },
  { key: 'dark', label: 'Dark', bg: '#14161f', fg: '#ede6d6' },
];

export default function SettingsPanel() {
  const { theme, setTheme, readingMode, setReadingMode } = useTheme();

  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 24, marginBottom: 24 }}>
        Settings
      </h2>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Theme</h3>
        <div style={{ display: 'flex', gap: 14 }}>
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              style={{
                width: 96,
                border: theme === t.key ? '2px solid var(--gold)' : '1px solid var(--border)',
                borderRadius: 10,
                padding: 0,
                overflow: 'hidden',
                background: 'var(--bg-elevated)',
              }}
            >
              <div style={{ height: 52, background: t.bg }} />
              <p style={{ fontSize: 12.5, padding: '8px 0', margin: 0, color: t.key === theme ? 'var(--gold)' : 'var(--text)' }}>
                {t.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Reading mode</h3>
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, width: 220, overflow: 'hidden' }}>
          {['leisure', 'academic'].map((mode) => (
            <button
              key={mode}
              onClick={() => setReadingMode(mode)}
              style={{
                flex: 1,
                padding: '9px 0',
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
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingTop: 20, maxWidth: 360 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Account</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>demo@katha.app</p>
      </section>
    </div>
  );
}
