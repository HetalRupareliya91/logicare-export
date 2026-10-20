import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import CarrierForm from './Form';

export const meta = { title: 'Carriers', path: 'carriers' };

const columns = [{ key: 'name', label: 'Carrier Name' }, { key: 'scac', label: 'SCAC Code' }, { key: 'mode', label: 'Mode' }, { key: 'contactEmail', label: 'Contact Email' }, { key: 'active', label: 'Active' }];

export default function CarrierList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/carriers?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/carriers/' + editing._id, data);
      else await api.post('/carriers', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/carriers/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Carriers</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <CarrierForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
