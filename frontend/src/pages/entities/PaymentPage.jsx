import { useEffect, useState } from 'react';
import { paymentService } from '../../services/paymentService';

export const meta = { title: 'Payments', path: 'payments' };

export default function PaymentPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    paymentService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Payments</h1>
        <input className="search" placeholder="Search payments..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.reference}</h3>
              <p><span>Invoice No:</span> {item.invoiceNo ?? '-'}</p>
              <p><span>Amount:</span> {item.amount ?? '-'}</p>
              <p><span>Method:</span> {item.method ?? '-'}</p>
              <p><span>Paid On:</span> {item.paidOn ? new Date(item.paidOn).toLocaleDateString() : '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
