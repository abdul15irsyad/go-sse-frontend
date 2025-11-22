import { Box, Center, Stack, Text } from '@mantine/core';
import React from 'react';

import { useAuthStore } from '../auth/(stores)/auth.store';

export const HomePanel = () => {
  const { authUser } = useAuthStore();

  return (
    <Box py={'sm'}>
      <Center py={60}>
        <Stack align='center' gap='xs'>
          <Text fw={600} fz='lg'>
            Hello {authUser?.name}
          </Text>

          <Text c='dimmed' fz='sm'>
            Welcome to SSE Notifications
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};
