import { Box, Button, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction, useCallback } from 'react';

import {
  useCountNotification,
  useNotification,
  useReadNotification,
} from '../(hooks)/api';
import { EmptyState } from './empty-state';
import { NotificationCard } from './notification-card';

export type NotificationPanelProps = {
  userNotifications: ReturnType<typeof useNotification>;
  countNotification: ReturnType<typeof useCountNotification>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const NotificationsPanel = ({
  userNotifications,
  countNotification,
  page,
  setPage,
}: NotificationPanelProps) => {
  const readNotification = useReadNotification();
  const handleReadNotification = useCallback(
    async (id: string) => {
      await readNotification.mutateAsync(id);
      await userNotifications.refetch();
      await countNotification.refetch();
    },
    [countNotification, readNotification, userNotifications],
  );

  return (
    <Box py={'sm'}>
      {userNotifications?.data?.data?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <Box mb='lg'>
            {userNotifications?.data?.data?.map(
              (notification, index, array) => (
                <Box
                  key={notification.id}
                  mb={index <= array.length - 1 ? 'xs' : undefined}
                >
                  <NotificationCard
                    notification={notification}
                    handleReadNotification={handleReadNotification}
                  />
                </Box>
              ),
            )}
          </Box>
          <Group justify='space-between'>
            <Button
              leftSection={<IconChevronLeft size='1.25em' />}
              color='dark'
              variant='outline'
              onClick={() => setPage((value) => value--)}
            >
              Prev
            </Button>
            <Button
              rightSection={<IconChevronRight size='1.25em' />}
              color='dark'
              variant='outline'
              onClick={() => setPage((value) => value++)}
            >
              Next
            </Button>
          </Group>
        </>
      )}
    </Box>
  );
};
