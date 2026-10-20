import { useEffect, useState } from 'react';
import { quotationService } from '../../services/quotationService';

export const meta = { title: 'Quotations', path: 'quotations' };

export default function QuotationPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    quotationService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Quotations</h1>
        <input className="search" placeholder="Search quotations..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.quoteNo}</h3>
              <p><span>Customer:</span> {item.customerName ?? '-'}</p>
              <p><span>Incoterm:</span> {item.incoterm ?? '-'}</p>
              <p><span>Amount:</span> {item.amount ?? '-'}</p>
              <p><span>Valid Until:</span> {item.validUntil ? new Date(item.validUntil).toLocaleDateString() : '-'}</p>
              <p><span>Status:</span> {item.status ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
