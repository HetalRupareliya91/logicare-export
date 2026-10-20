import { useEffect, useState } from 'react';
import { invoiceService } from '../../services/invoiceService';

export const meta = { title: 'Invoices', path: 'invoices' };

export default function InvoicePage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    invoiceService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Invoices</h1>
        <input className="search" placeholder="Search invoices..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.invoiceNo}</h3>
              <p><span>Customer:</span> {item.customerName ?? '-'}</p>
              <p><span>Amount:</span> {item.amount ?? '-'}</p>
              <p><span>Currency:</span> {item.currency ?? '-'}</p>
              <p><span>Issue Date:</span> {item.issueDate ? new Date(item.issueDate).toLocaleDateString() : '-'}</p>
              <p><span>Due Date:</span> {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}</p>
              <p><span>Status:</span> {item.status ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
