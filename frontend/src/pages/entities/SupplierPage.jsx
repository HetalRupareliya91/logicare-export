import { useEffect, useState } from 'react';
import { supplierService } from '../../services/supplierService';

export const meta = { title: 'Suppliers', path: 'suppliers' };

export default function SupplierPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    supplierService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Suppliers</h1>
        <input className="search" placeholder="Search suppliers..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.companyName}</h3>
              <p><span>Contact:</span> {item.contactName ?? '-'}</p>
              <p><span>Email:</span> {item.email ?? '-'}</p>
              <p><span>Phone:</span> {item.phone ?? '-'}</p>
              <p><span>Country:</span> {item.country ?? '-'}</p>
              <p><span>Rating:</span> {item.rating ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
