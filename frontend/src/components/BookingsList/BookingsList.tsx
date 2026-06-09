import type { Booking } from '../../types';
import styles from './BookingsList.module.css';

interface BookingsListProps {
  bookings: Booking[];
  loading: boolean;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function BookingsList({ bookings, loading }: BookingsListProps) {
  if (loading) {
    return <p className={styles.muted}>Loading bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className={styles.muted}>No upcoming bookings.</p>;
  }

  return (
    <div className={styles.table}>
      {bookings.map((b) => (
        <div key={b.id} className={styles.row}>
          <div className={styles.guest}>
            <strong>{b.guestName}</strong>
            <span className={styles.email}>{b.guestEmail}</span>
          </div>
          <div className={styles.time}>
            {formatDateTime(b.startTime)} &ndash;{' '}
            {formatDateTime(b.endTime)}
          </div>
        </div>
      ))}
    </div>
  );
}
