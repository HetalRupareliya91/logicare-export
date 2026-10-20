const fmt = (v) => {
  if (v === null || v === undefined || v === '') return '-';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleDateString();
  return String(v);
};

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((c) => <th key={c.key}>{c.label}</th>)}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              {columns.map((c) => <td key={c.key} data-label={c.label}>{fmt(r[c.key])}</td>)}
              <td className="row-actions">
                <button className="ghost" onClick={() => onEdit(r)}>Edit</button>
                <button className="danger" onClick={() => onDelete(r)}>Delete</button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr><td colSpan={columns.length + 1} className="muted">No records yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
