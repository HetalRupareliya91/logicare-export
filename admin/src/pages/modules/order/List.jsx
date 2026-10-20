import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../api/client';
import DataTable from '../../../components/DataTable';
import OrderForm from './Form';

export const meta = { title: 'Orders', path: 'orders' };

const columns = [{ key: 'orderNo', label: 'Order No' }, { key: 'customerName', label: 'Customer' }, { key: 'type', label: 'Type (Import/Export)' }, { key: 'totalAmount', label: 'Total Amount' }, { key: 'currency', label: 'Currency' }, { key: 'orderDate', label: 'Order Date' }, { key: 'status', label: 'Status' }];

export default function OrderList() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/orders?limit=100&q=' + encodeURIComponent(q))
      .then((r) => { setRows(r.items || []); setError(''); })
      .catch((e) => setError(e.message));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    try {
      if (editing && editing._id) await api.put('/orders/' + editing._id, data);
      else await api.post('/orders', data);
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.del('/orders/' + row._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <div className="toolbar">
        <h1>Orders</h1>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => setEditing({})}>+ New</button>
      </div>
      {error && <p className="error">{error}</p>}
      {editing && (
        <div className="panel">
          <OrderForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <DataTable columns={columns} rows={rows} onEdit={setEditing} onDelete={remove} />
    </section>
  );
}
