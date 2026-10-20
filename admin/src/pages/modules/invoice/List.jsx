import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import InvoiceForm from './Form';

export const meta = { title: 'Invoices', path: 'invoices' };

const columns = [{ key: 'invoiceNo', label: 'Invoice No' }, { key: 'customerName', label: 'Customer' }, { key: 'amount', label: 'Amount' }, { key: 'currency', label: 'Currency' }, { key: 'issueDate', label: 'Issue Date' }, { key: 'dueDate', label: 'Due Date' }, { key: 'status', label: 'Status' }];

export default function InvoiceList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/invoices?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/invoices/' + editing._id, data);
      else await api.post('/invoices', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/invoices/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Invoices</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <InvoiceForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
