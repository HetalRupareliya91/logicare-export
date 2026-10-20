import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import CustomsDeclarationForm from './Form';

export const meta = { title: 'Customs Declarations', path: 'customs-declarations' };

const columns = [{ key: 'declarationNo', label: 'Declaration No' }, { key: 'shipmentNo', label: 'Shipment No' }, { key: 'type', label: 'Type (Shipping Bill/Bill of Entry)' }, { key: 'dutyAmount', label: 'Duty Amount' }, { key: 'filedOn', label: 'Filed On' }, { key: 'status', label: 'Status' }];

export default function CustomsDeclarationList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/customs-declarations?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/customs-declarations/' + editing._id, data);
      else await api.post('/customs-declarations', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/customs-declarations/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Customs Declarations</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <CustomsDeclarationForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
