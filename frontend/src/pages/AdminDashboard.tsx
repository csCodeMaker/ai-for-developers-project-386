import { useState, useEffect } from 'react';
import { useBookings } from '../hooks/useBookings';
import { fetchAdminEventTypes, createEventType, updateEventType, deleteEventType } from '../api/admin';
import { fetchOwner, updateOwner } from '../api/admin';
import { BookingsList } from '../components/BookingsList/BookingsList';
import { EventTypeManager } from '../components/EventTypeManager/EventTypeManager';
import { OwnerForm } from '../components/OwnerForm/OwnerForm';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { EventType, Owner, CreateEventTypeRequest } from '../types';
import styles from './AdminDashboard.module.css';

export function AdminDashboard() {
  const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings();
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [eventTypesLoading, setEventTypesLoading] = useState(true);
  const [eventTypesError, setEventTypesError] = useState<string | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [ownerLoading, setOwnerLoading] = useState(true);
  const [ownerError, setOwnerError] = useState<string | null>(null);

  const loadEventTypes = () => {
    setEventTypesLoading(true);
    setEventTypesError(null);
    fetchAdminEventTypes()
      .then(setEventTypes)
      .catch((e) => setEventTypesError(e.message))
      .finally(() => setEventTypesLoading(false));
  };

  const loadOwner = () => {
    setOwnerLoading(true);
    setOwnerError(null);
    fetchOwner()
      .then(setOwner)
      .catch((e) => setOwnerError(e.message))
      .finally(() => setOwnerLoading(false));
  };

  useEffect(() => {
    loadEventTypes();
    loadOwner();
  }, []);

  const handleCreate = async (data: CreateEventTypeRequest) => {
    await createEventType(data);
    loadEventTypes();
  };

  const handleUpdate = async (id: string, data: CreateEventTypeRequest) => {
    await updateEventType(id, data);
    loadEventTypes();
  };

  const handleDelete = async (id: string) => {
    await deleteEventType(id);
    loadEventTypes();
  };

  const handleOwnerSave = async (data: Owner) => {
    const updated = await updateOwner(data);
    setOwner(updated);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Bookings</h2>
        {bookingsError && <ErrorMessage message={bookingsError} />}
        <BookingsList bookings={bookings} loading={bookingsLoading} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Event Types</h2>
        {eventTypesError && <ErrorMessage message={eventTypesError} />}
        <EventTypeManager
          eventTypes={eventTypes}
          loading={eventTypesLoading}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Owner Profile</h2>
        {ownerError && <ErrorMessage message={ownerError} />}
        <OwnerForm
          owner={owner}
          loading={ownerLoading}
          onSave={handleOwnerSave}
        />
      </section>
    </div>
  );
}
