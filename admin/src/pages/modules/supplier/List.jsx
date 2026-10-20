import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import SupplierForm from './Form';

export const meta = { title: 'Suppliers', path: 'suppliers' };

const columns = [{ key: 'companyName', label: 'Company' }, { key: 'contactName', label: 'Contact' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'country', label: 'Country' }, { key: 'rating', label: 'Rating' }];

export default function SupplierList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/suppliers?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/suppliers/' + editing._id, data);
      else await api.post('/suppliers', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/suppliers/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Suppliers</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <SupplierForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
