import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function fmt(num) {
  if (!num || num === 0) return '—';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
}

const COLS = [
  { key: 'title', label: 'Title' },
  { key: 'releaseYear', label: 'Year' },
  { key: 'budget', label: 'Budget' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'voteAverage', label: 'Rating' },
  { key: 'popularity', label: 'Popularity' },
];

export default function TopMoviesTable({ movies }) {
  const [sortKey, setSortKey] = useState('popularity');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const PER_PAGE = 10;

  const sorted = [...movies].sort((a, b) => {
    const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  const paginated = sorted.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);

  const handleSort = key => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(0);
  };

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="table-title">Movie Data Explorer</h3>
        <p className="table-subtitle">{sorted.length} movies — click column headers to sort</p>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              {COLS.map(c => (
                <th key={c.key} onClick={() => handleSort(c.key)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
                    {c.label}
                    {sortKey === c.key ? (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((m, i) => (
              <tr key={i}>
                <td style={{ color: '#f3f4f6', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</td>
                <td>{m.releaseYear || '—'}</td>
                <td>{fmt(m.budget)}</td>
                <td>{fmt(m.revenue)}</td>
                <td>
                  <span style={{
                    fontWeight: 600,
                    color: m.voteAverage >= 8 ? '#10b981' : m.voteAverage >= 6 ? '#f59e0b' : '#ef4444'
                  }}>
                    {m.voteAverage > 0 ? m.voteAverage.toFixed(1) : '—'}
                  </span>
                </td>
                <td>{m.popularity.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#9ca3af', borderTop: '1px solid rgba(167, 139, 250, 0.1)' }}>
        <span>Page {page + 1} of {totalPages}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              background: page === 0 ? 'rgba(55, 65, 81, 0.3)' : 'rgba(55, 65, 81, 0.5)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              color: '#f3f4f6',
              cursor: page === 0 ? 'not-allowed' : 'pointer',
              opacity: page === 0 ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => !page === 0 && (e.target.style.background = 'rgba(55, 65, 81, 0.8)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(55, 65, 81, 0.5)')}
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              background: page >= totalPages - 1 ? 'rgba(55, 65, 81, 0.3)' : 'rgba(55, 65, 81, 0.5)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              color: '#f3f4f6',
              cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: page >= totalPages - 1 ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => page < totalPages - 1 && (e.target.style.background = 'rgba(55, 65, 81, 0.8)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(55, 65, 81, 0.5)')}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}