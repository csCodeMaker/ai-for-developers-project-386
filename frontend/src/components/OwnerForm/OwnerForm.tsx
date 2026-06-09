import { useState } from 'react';
import { Paper, Stack, TextInput, Textarea, Button, Text } from '@mantine/core';
import type { Owner } from '../../types';

interface OwnerFormProps {
  owner: Owner | null;
  loading: boolean;
  onSave: (data: Owner) => Promise<void>;
}

export function OwnerForm({ owner, loading, onSave }: OwnerFormProps) {
  const [name, setName] = useState(owner?.name ?? '');
  const [email, setEmail] = useState(owner?.email ?? '');
  const [description, setDescription] = useState(owner?.description ?? '');
  const [timeZone, setTimeZone] = useState(owner?.timeZone ?? '');
  const [busy, setBusy] = useState(false);

  if (loading) return <Text c="dimmed" size="sm">Загрузка профиля...</Text>;
  if (!owner) return <Text c="dimmed" size="sm">Профиль не найден.</Text>;

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setBusy(true);
    try {
      await onSave({ ...owner, name: name.trim(), email: email.trim(), description: description.trim(), timeZone: timeZone.trim() });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="sm">
        <TextInput label="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Textarea label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        <TextInput label="Часовой пояс" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} placeholder="Europe/Moscow" />
        <Button onClick={handleSubmit} loading={busy}>Сохранить</Button>
      </Stack>
    </Paper>
  );
}
