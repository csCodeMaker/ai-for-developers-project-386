import styles from './Calendar.module.css';

interface CalendarProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getDates(): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(formatDate(d));
  }

  return dates;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const dates = getDates();

  return (
    <div className={styles.calendar}>
      {dates.map((date) => {
        const d = new Date(date);
        const dayName = DAY_NAMES[d.getDay()];
        const dayNum = d.getDate();
        const isSelected = date === selectedDate;
        const isToday = date === formatDate(new Date());

        return (
          <button
            key={date}
            className={`${styles.day} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
            onClick={() => onSelect(date)}
          >
            <span className={styles.dayName}>{dayName}</span>
            <span className={styles.dayNum}>{dayNum}</span>
          </button>
        );
      })}
    </div>
  );
}
