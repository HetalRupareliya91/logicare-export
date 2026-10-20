import { useEffect, useState } from 'react';
import { customsDeclarationService } from '../../services/customsDeclarationService';

export const meta = { title: 'Customs Declarations', path: 'customs-declarations' };

export default function CustomsDeclarationPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    customsDeclarationService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Customs Declarations</h1>
        <input className="search" placeholder="Search customs declarations..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.declarationNo}</h3>
              <p><span>Shipment No:</span> {item.shipmentNo ?? '-'}</p>
              <p><span>Type (Shipping Bill/Bill of Entry):</span> {item.type ?? '-'}</p>
              <p><span>Duty Amount:</span> {item.dutyAmount ?? '-'}</p>
              <p><span>Filed On:</span> {item.filedOn ? new Date(item.filedOn).toLocaleDateString() : '-'}</p>
              <p><span>Status:</span> {item.status ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
