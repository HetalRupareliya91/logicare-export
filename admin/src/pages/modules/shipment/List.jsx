import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import ShipmentForm from './Form';

export const meta = { title: 'Shipments', path: 'shipments' };

const columns = [{ key: 'shipmentNo', label: 'Shipment No' }, { key: 'orderNo', label: 'Order No' }, { key: 'mode', label: 'Mode (Sea/Air/Road)' }, { key: 'originPort', label: 'Origin Port' }, { key: 'destinationPort', label: 'Destination Port' }, { key: 'etd', label: 'ETD' }, { key: 'eta', label: 'ETA' }, { key: 'status', label: 'Status' }];

export default function ShipmentList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/shipments?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/shipments/' + editing._id, data);
      else await api.post('/shipments', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/shipments/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Shipments</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <ShipmentForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
