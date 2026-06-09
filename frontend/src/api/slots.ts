import { apiRequest } from './client';
import type { AvailableSlot } from '../types';

export function fetchSlots(
  eventTypeId: string,
  date: string,
): Promise<AvailableSlot[]> {
  return apiRequest(
    `/event-types/${eventTypeId}/slots?date=${encodeURIComponent(date)}`,
  );
}
