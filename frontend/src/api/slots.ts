import type { Slot } from '../types';
import { fetchAllBookings } from './bookings';

const WORK_START_HOUR = 8; // 08:00
const WORK_END_HOUR = 20; // 20:00
const SLOT_MINUTES = 30;

/**
 * Генерирует слоты по 30 минут на указанную дату (08:00–20:00).
 * Скрывает прошедшие слоты (для сегодня) и помечает занятые
 * (пересечение с любой бронью по всем типам событий) флагом isBusy.
 */
export async function fetchSlots(
  _eventTypeId: string,
  date: string,
): Promise<Slot[]> {
  const now = new Date();

  // 1. Генерация слотов окна 08:00–20:00 с шагом 30 минут
  const slots: { startTime: string; endTime: string }[] = [];
  for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      const start = new Date(`${date}T00:00:00`);
      start.setHours(hour, minute, 0, 0);
      const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);

      // 2. Скрыть прошедшие слоты
      if (start <= now) continue;

      slots.push({
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });
    }
  }

  // 3. Пометить занятые слоты (пересечение с бронями)
  let bookings: { startTime: string; endTime: string }[] = [];
  try {
    bookings = await fetchAllBookings();
  } catch {
    // если брони недоступны — считаем все слоты свободными
    return slots.map((slot) => ({ ...slot, isBusy: false }));
  }

  return slots.map((slot) => {
    const slotStart = new Date(slot.startTime).getTime();
    const slotEnd = new Date(slot.endTime).getTime();
    const isBusy = bookings.some((b) => {
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();
      return slotStart < bEnd && bStart < slotEnd;
    });
    return { ...slot, isBusy };
  });
}
