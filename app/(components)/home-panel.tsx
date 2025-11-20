import { Box, Text } from '@mantine/core';
import React from 'react';

import { useAuthStore } from '../auth/(stores)/auth.store';

export const HomePanel = () => {
  const { authUser } = useAuthStore();

  return (
    <Box py={'sm'}>
      <Text>Hello {authUser?.name}</Text>
    </Box>
  );
};
