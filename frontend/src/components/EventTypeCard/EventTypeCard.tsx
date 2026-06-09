import { useNavigate } from 'react-router-dom';
import type { EventType } from '../../types';
import { Button } from '../ui/Button';
import styles from './EventTypeCard.module.css';

interface EventTypeCardProps {
  eventType: EventType;
}

export function EventTypeCard({ eventType }: EventTypeCardProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{eventType.title}</h2>
      <p className={styles.description}>{eventType.description}</p>
      <p className={styles.duration}>{eventType.duration} min</p>
      <Button onClick={() => navigate(`/book/${eventType.id}`)}>
        Book
      </Button>
    </div>
  );
}
