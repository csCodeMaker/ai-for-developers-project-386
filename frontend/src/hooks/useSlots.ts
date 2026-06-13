import { useState, useEffect } from 'react';
import { fetchSlots } from '../api/slots';
import type { Slot } from '../types';

export function useSlots(eventTypeId: string, date: string | null) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetchSlots(eventTypeId, date)
      .then(setSlots)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [eventTypeId, date]);

  return { slots, loading, error };
}
