import { useEventTypes } from '../hooks/useEventTypes';
import { EventTypeCard } from '../components/EventTypeCard/EventTypeCard';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import styles from './HomePage.module.css';

export function HomePage() {
  const { eventTypes, loading, error } = useEventTypes();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Book a call</h1>
      <p className={styles.subtitle}>
        Choose the type of meeting you would like to schedule.
      </p>
      <div className={styles.grid}>
        {eventTypes.map((et) => (
          <EventTypeCard key={et.id} eventType={et} />
        ))}
      </div>
    </div>
  );
}
