import type { AvailableSlot } from '../../types';
import styles from './TimeSlotGrid.module.css';

interface TimeSlotGridProps {
  slots: AvailableSlot[];
  selectedSlot: string | null;
  onSelect: (startTime: string) => void;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TimeSlotGrid({
  slots,
  selectedSlot,
  onSelect,
}: TimeSlotGridProps) {
  if (slots.length === 0) {
    return <p className={styles.empty}>No available slots for this day.</p>;
  }

  return (
    <div className={styles.grid}>
      {slots.map((slot) => {
        const isSelected = slot.startTime === selectedSlot;
        return (
          <button
            key={slot.startTime}
            className={`${styles.slot} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(slot.startTime)}
          >
            {formatTime(slot.startTime)}
          </button>
        );
      })}
    </div>
  );
}
