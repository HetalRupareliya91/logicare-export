import { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';

export const meta = { title: 'Orders', path: 'orders' };

export default function OrderPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    orderService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Orders</h1>
        <input className="search" placeholder="Search orders..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.orderNo}</h3>
              <p><span>Customer:</span> {item.customerName ?? '-'}</p>
              <p><span>Type (Import/Export):</span> {item.type ?? '-'}</p>
              <p><span>Total Amount:</span> {item.totalAmount ?? '-'}</p>
              <p><span>Currency:</span> {item.currency ?? '-'}</p>
              <p><span>Order Date:</span> {item.orderDate ? new Date(item.orderDate).toLocaleDateString() : '-'}</p>
              <p><span>Status:</span> {item.status ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
