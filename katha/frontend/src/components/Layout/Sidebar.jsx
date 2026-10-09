import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Library', icon: '☰' },
  { to: '/read/doc-1', label: 'Reader', icon: '▤' },
  { to: '/bookmarks', label: 'Bookmarks', icon: '⌸' },
  { to: '/notes', label: 'Notes', icon: '✎' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        background: 'var(--bg-shelf)',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 18px',
      }}
    >
      <div style={{ marginBottom: 40, paddingLeft: 6 }}>
        <h1 className="font-display" style={{ fontSize: 26, fontWeight: 600 }}>
          Katha
        </h1>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '4px 0 0' }}>
          A reader's companion
        </p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 14.5,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-text)' : 'var(--text)',
              background: isActive ? 'var(--accent)' : 'transparent',
              transition: 'background 0.15s ease',
            })}
          >
            <span aria-hidden="true" style={{ fontSize: 16, width: 18, textAlign: 'center' }}>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
