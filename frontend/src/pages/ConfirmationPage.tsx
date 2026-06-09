import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import styles from './ConfirmationPage.module.css';

export function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.heading}>Booking confirmed!</h1>
        <p className={styles.text}>
          Your booking <strong>#{id}</strong> has been created.
        </p>
        <p className={styles.text}>
          You will receive a confirmation email shortly.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
