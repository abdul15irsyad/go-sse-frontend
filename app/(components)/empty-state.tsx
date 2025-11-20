import { Center, Stack, Text } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';

interface EmptyProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({
  title = 'Nothing here',
  message = 'There is no data to display.',
}: EmptyProps) => {
  return (
    <Center py={60}>
      <Stack align='center' gap='xs'>
        <IconInbox size={36} stroke={0.75} />

        <Text fw={600} fz='lg'>
          {title}
        </Text>

        <Text c='dimmed' fz='sm'>
          {message}
        </Text>
      </Stack>
    </Center>
  );
};
