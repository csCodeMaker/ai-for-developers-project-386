import { useState } from 'react';
import type { EventType, CreateEventTypeRequest } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import styles from './EventTypeManager.module.css';

interface EventTypeManagerProps {
  eventTypes: EventType[];
  loading: boolean;
  onCreate: (data: CreateEventTypeRequest) => Promise<void>;
  onUpdate: (id: string, data: CreateEventTypeRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function EventTypeManager({
  eventTypes,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}: EventTypeManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [busy, setBusy] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDuration(30);
  };

  const startEdit = (et: EventType) => {
    setEditingId(et.id);
    setTitle(et.title);
    setDescription(et.description);
    setDuration(et.duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setBusy(true);

    try {
      if (editingId) {
        await onUpdate(editingId, {
          title: title.trim(),
          description: description.trim(),
          duration,
        });
      } else {
        await onCreate({
          title: title.trim(),
          description: description.trim(),
          duration,
        });
      }
      resetForm();
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    try {
      await onDelete(id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="30-min call"
        />
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Quick chat about..."
            rows={2}
          />
        </div>
        <Input
          label="Duration (min)"
          type="number"
          min={5}
          max={120}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
        <div className={styles.actions}>
          <Button type="submit" disabled={busy}>
            {editingId ? 'Update' : 'Create'}
          </Button>
          {editingId && (
            <Button variant="secondary" onClick={resetForm} type="button">
              Cancel
            </Button>
          )}
        </div>
      </form>

      {loading && <p className={styles.muted}>Loading...</p>}

      <div className={styles.list}>
        {eventTypes.map((et) => (
          <div key={et.id} className={styles.item}>
            <div>
              <strong>{et.title}</strong>
              <span className={styles.meta}>
                {' '}
                &mdash; {et.duration}min
                {et.isDisabled ? ' (disabled)' : ''}
              </span>
            </div>
            <div className={styles.itemActions}>
              <Button
                variant="secondary"
                onClick={() => startEdit(et)}
                disabled={busy}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(et.id)}
                disabled={busy}
              >
                {et.isDisabled ? 'Delete' : 'Disable'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
