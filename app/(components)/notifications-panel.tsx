import { Box } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';

import {
  useCountNotification,
  useNotification,
  useReadNotification,
} from '../(hooks)/api';
import { EmptyState } from './empty-state';
import { NotificationCard } from './notification-card';

export const NotificationsPanel = ({
  countNotification,
}: {
  countNotification: ReturnType<typeof useCountNotification>;
}) => {
  const { data, refetch } = useNotification({ status: 'all' });

  const readNotification = useReadNotification();
  const handleReadNotification = useCallback(
    async (id: string) => {
      await readNotification.mutateAsync(id);
      await refetch();
      await countNotification.refetch();
    },
    [countNotification, readNotification, refetch],
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/notif/stream`,
      {
        withCredentials: true,
      },
    );

    eventSource.onopen = () => {
      console.log('SSE connected');
    };

    eventSource.onmessage = async (event) => {
      console.log('Received:', event.data);
      await countNotification.refetch();
      await refetch();
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [countNotification, refetch]);

  return (
    <Box py={'sm'}>
      {data?.data?.length === 0 ? (
        <EmptyState />
      ) : (
        data?.data?.map((notification, index, array) => (
          <Box
            key={notification.id}
            mb={index <= array.length - 1 ? 'sm' : undefined}
          >
            <NotificationCard
              notification={notification}
              handleReadNotification={handleReadNotification}
            />
          </Box>
        ))
      )}
    </Box>
  );
};
