import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  selectedSlot: string | null;
  onSubmit: (data: { guestName: string; guestEmail: string }) => void;
  loading: boolean;
}

export function BookingForm({
  selectedSlot,
  onSubmit,
  loading,
}: BookingFormProps) {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) return;
    onSubmit({ guestName: guestName.trim(), guestEmail: guestEmail.trim() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Your name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
        placeholder="John Doe"
      />
      <Input
        label="Email"
        type="email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
        required
        placeholder="john@example.com"
      />
      <Button type="submit" disabled={!selectedSlot || loading}>
        {loading ? 'Booking...' : 'Confirm booking'}
      </Button>
    </form>
  );
}
