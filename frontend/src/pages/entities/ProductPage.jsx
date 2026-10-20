import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';

export const meta = { title: 'Products', path: 'products' };

export default function ProductPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    productService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Products</h1>
        <input className="search" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.name}</h3>
              <p><span>SKU:</span> {item.sku ?? '-'}</p>
              <p><span>HS Code:</span> {item.hsCode ?? '-'}</p>
              <p><span>Unit Price:</span> {item.unitPrice ?? '-'}</p>
              <p><span>Unit:</span> {item.unit ?? '-'}</p>
              <p><span>Origin Country:</span> {item.originCountry ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
