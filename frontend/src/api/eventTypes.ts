import type { EventType } from '../types';

const DEFAULT_EVENT_TYPE: EventType = {
  id: 'default',
  title: '30-минутный звонок',
  description: 'Быстрый созвон на 30 минут',
  duration: 30,
  isDisabled: false,
};

export function fetchEventTypes(): Promise<EventType[]> {
  return Promise.resolve([DEFAULT_EVENT_TYPE]);
}
