import { useState } from 'react';
import type { Owner } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import styles from './OwnerForm.module.css';

interface OwnerFormProps {
  owner: Owner | null;
  loading: boolean;
  onSave: (data: Owner) => Promise<void>;
}

export function OwnerForm({ owner, loading, onSave }: OwnerFormProps) {
  const [name, setName] = useState(owner?.name ?? '');
  const [email, setEmail] = useState(owner?.email ?? '');
  const [description, setDescription] = useState(owner?.description ?? '');
  const [timeZone, setTimeZone] = useState(owner?.timeZone ?? '');
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <p className={styles.muted}>Loading profile...</p>;
  }

  if (!owner) {
    return <p className={styles.muted}>No owner profile found.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setBusy(true);
    try {
      await onSave({
        ...owner,
        name: name.trim(),
        email: email.trim(),
        description: description.trim(),
        timeZone: timeZone.trim(),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      <Input label="Time zone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} placeholder="Europe/Moscow" />
      <Button type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save'}</Button>
    </form>
  );
}
