import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSlots } from '../hooks/useSlots';
import { Calendar } from '../components/Calendar/Calendar';
import { TimeSlotGrid } from '../components/TimeSlotGrid/TimeSlotGrid';
import { BookingForm } from '../components/BookingForm/BookingForm';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { createBooking } from '../api/bookings';
import styles from './BookingPage.module.css';

export function BookingPage() {
  const { eventTypeId } = useParams<{ eventTypeId: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { slots, loading, error } = useSlots(eventTypeId!, selectedDate);

  const handleBooking = async (data: {
    guestName: string;
    guestEmail: string;
  }) => {
    if (!eventTypeId || !selectedSlot) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const booking = await createBooking({
        eventTypeId,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        startTime: selectedSlot,
      });
      navigate(`/booking/${booking.id}`);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <Button variant="secondary" onClick={() => navigate('/')}>
        &larr; Back
      </Button>

      <h1 className={styles.heading}>Select a date &amp; time</h1>

      <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />

      {!selectedDate && (
        <p className={styles.hint}>Pick a date to see available slots.</p>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {selectedDate && !loading && !error && (
        <>
          <TimeSlotGrid
            slots={slots}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />

          {selectedSlot && (
            <>
              <h2 className={styles.subheading}>Your details</h2>
              {submitError && <ErrorMessage message={submitError} />}
              <BookingForm
                selectedSlot={selectedSlot}
                onSubmit={handleBooking}
                loading={submitting}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
