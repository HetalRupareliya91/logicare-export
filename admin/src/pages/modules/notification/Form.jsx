import { useState } from 'react';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'message', label: 'Message', type: 'text' },
  { name: 'audience', label: 'Audience', type: 'text' },
  { name: 'read', label: 'Read', type: 'checkbox' },
];

const initialState = (initial) =>
  Object.fromEntries(fields.map((f) => [f.name, initial?.[f.name] ?? (f.type === 'checkbox' ? false : '')]));

export default function NotificationForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => initialState(initial));
  const set = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      {fields.map((f) => (
        <label key={f.name} className={f.type === 'checkbox' ? 'check' : ''}>
          <span>{f.label}</span>
          {f.type === 'checkbox' ? (
            <input type="checkbox" checked={!!form[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
          ) : (
            <input
              type={f.type}
              required={f.required}
              value={f.type === 'date' && form[f.name] ? String(form[f.name]).slice(0, 10) : form[f.name]}
              onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
            />
          )}
        </label>
      ))}
      <div className="actions">
        <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
