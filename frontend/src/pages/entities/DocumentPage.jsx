import { useEffect, useState } from 'react';
import { documentService } from '../../services/documentService';

export const meta = { title: 'Documents', path: 'documents' };

export default function DocumentPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    documentService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Documents</h1>
        <input className="search" placeholder="Search documents..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.title}</h3>
              <p><span>Document Type:</span> {item.docType ?? '-'}</p>
              <p><span>Shipment No:</span> {item.shipmentNo ?? '-'}</p>
              <p><span>File URL:</span> {item.fileUrl ?? '-'}</p>
              <p><span>Verified:</span> {item.verified ? 'Yes' : 'No'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
