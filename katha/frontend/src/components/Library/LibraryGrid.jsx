import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { MOCK_BOOKS } from '../../mock/library';
import apiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function LibraryGrid() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get('/documents')
      .then(({ data }) => {
        if (data.documents?.length) setBooks(data.documents);
      })
      .catch(() => {});
  }, []);

  const resume = [...books]
    .filter((b) => b.lastOpenedAt)
    .sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt))[0];

  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 24, marginBottom: 4 }}>
        Your library
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '0 0 28px' }}>
        {books.length} book{books.length === 1 ? '' : 's'} on the shelf
      </p>

      {resume && (
        <button
          onClick={() => navigate(`/read/${resume._id}`)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'var(--accent)',
            color: 'var(--accent-text)',
            border: 'none',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 32,
            width: '100%',
            maxWidth: 460,
          }}
        >
          <div style={{ width: 40, height: 56, background: resume.coverColor || '#333', borderRadius: 2, flexShrink: 0 }} />
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.85 }}>Resume reading</p>
            <p className="font-display" style={{ margin: '2px 0 0', fontSize: 16 }}>
              {resume.title}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, opacity: 0.85 }}>
              Page {resume.lastPageRead} of {resume.pageCount}
            </p>
          </div>
        </button>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
