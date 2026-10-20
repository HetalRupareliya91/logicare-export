import { useEffect, useState } from 'react';
import { hsCodeService } from '../../services/hsCodeService';

export const meta = { title: 'HS Codes', path: 'hs-codes' };

export default function HsCodePage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    hsCodeService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>HS Codes</h1>
        <input className="search" placeholder="Search hs codes..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.code}</h3>
              <p><span>Description:</span> {item.description ?? '-'}</p>
              <p><span>Duty Rate (%):</span> {item.dutyRate ?? '-'}</p>
              <p><span>GST Rate (%):</span> {item.gstRate ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
