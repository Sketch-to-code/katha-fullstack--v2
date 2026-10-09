export default function AIPanel({ selectedText, onClose }) {
  const mockMessages = [
    { from: 'bot', text: 'I can summarize this passage, explain the key idea, or read it aloud.' },
    { from: 'user', text: 'Summarize the current chapter.' },
    { from: 'bot', text: 'This section introduces the central conflict and sets up the next major turning point.' },
  ];

  return (
    <aside
      style={{
        width: 'min(420px, calc(100vw - 32px))',
        marginTop: 18,
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 16px 36px rgba(12, 16, 20, 0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(135deg, rgba(212, 180, 89, 0.12), rgba(120, 171, 255, 0.08))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#43b581',
              boxShadow: '0 0 0 4px rgba(67, 181, 129, 0.12)',
            }}
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Academic AI</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Online now</div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 18,
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Close AI panel"
        >
          ×
        </button>
      </div>

      {selectedText && (
        <div
          style={{
            padding: '10px 14px 0',
            fontSize: 11.5,
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>Selected text</div>
          <div style={{ lineHeight: 1.5 }}>{selectedText.slice(0, 120)}{selectedText.length > 120 ? '…' : ''}</div>
        </div>
      )}

      <div style={{ padding: '14px', display: 'grid', gap: 10, maxHeight: 220, overflow: 'auto' }}>
        {mockMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              maxWidth: '78%',
              marginLeft: msg.from === 'bot' ? 0 : 'auto',
              padding: '10px 12px',
              borderRadius: 12,
              background: msg.from === 'bot' ? 'rgba(122, 142, 175, 0.08)' : 'var(--accent)',
              color: msg.from === 'bot' ? 'var(--text)' : 'var(--accent-text)',
              fontSize: 12.5,
              lineHeight: 1.5,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 14px 14px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {['Summarize', 'Explain', 'Narrate'].map((action) => (
            <button
              key={action}
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text)',
                borderRadius: 999,
                padding: '7px 8px',
                fontSize: 11,
                cursor: 'default',
              }}
            >
              {action}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value="Ask about this page..."
            readOnly
            style={{
              flex: 1,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text-muted)',
              borderRadius: 999,
              padding: '10px 12px',
              fontSize: 12,
            }}
          />
          <button
            style={{
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--accent-text)',
              borderRadius: 999,
              padding: '0 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'default',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </aside>
  );
}
