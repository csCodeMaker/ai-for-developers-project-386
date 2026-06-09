import { Container, Title, Text, SimpleGrid } from '@mantine/core';
import { useEventTypes } from '../hooks/useEventTypes';
import { EventTypeCard } from '../components/EventTypeCard/EventTypeCard';
import { Loader } from '../components/ui/Loader';

export function HomePage() {
  const { eventTypes, loading, error } = useEventTypes();

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error}</Text>;

  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="xs">
        Book a call
      </Title>
      <Text c="dimmed" mb="lg">
        Choose the type of meeting you would like to schedule.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {eventTypes.map((et) => (
          <EventTypeCard key={et.id} eventType={et} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
