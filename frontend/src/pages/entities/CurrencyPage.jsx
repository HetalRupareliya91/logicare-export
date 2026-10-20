import { useEffect, useState } from 'react';
import { currencyService } from '../../services/currencyService';

export const meta = { title: 'Currencies', path: 'currencies' };

export default function CurrencyPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    currencyService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Currencies</h1>
        <input className="search" placeholder="Search currencies..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.code}</h3>
              <p><span>Name:</span> {item.name ?? '-'}</p>
              <p><span>Symbol:</span> {item.symbol ?? '-'}</p>
              <p><span>Rate to INR:</span> {item.rateToInr ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
