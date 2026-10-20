import { Link } from 'react-router-dom';

export default function Home({ pages }) {
  return (
    <section>
      <div className="hero">
        <h1>Global trade, simplified.</h1>
        <p>Track shipments, manage orders, customs paperwork and invoices for every import and export in one place.</p>
      </div>
      <div className="grid">
        {pages.map((p) => (
          <Link key={p.path} to={'/' + p.path} className="card tile">
            <h3>{p.title}</h3>
            <p className="muted">Open {p.title.toLowerCase()}</p>
          </Link>
        ))}
        {!pages.length && <p className="muted">Modules will appear here as they are added.</p>}
      </div>
    </section>
  );
}
