import { Link } from 'react-router-dom';

export default function StatCard({ title, value, to }) {
  return (
    <Link to={to} className="stat">
      <div className="value">{value}</div>
      <div className="label">{title}</div>
    </Link>
  );
}
