import {
  Badge,
  Card,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Notification } from '../(types)/api';
import styles from './notification-card.module.css';
dayjs.extend(relativeTime);

export const NotificationCard = ({
  notification: { id, title, message, readAt, createdAt },
  handleReadNotification,
}: {
  handleReadNotification: (id: string) => void;
  notification: Notification;
}) => {
  const theme = useMantineTheme();
  const isRead = Boolean(readAt);

  return (
    <Card
      radius='md'
      p='sm'
      pos={'relative'}
      bg={isRead ? undefined : 'gray.0'}
      withBorder
      style={{
        width: '100%',
        cursor: isRead ? undefined : 'pointer',
      }}
      className={styles['notification-card']}
      onClick={() => {
        if (isRead) return;
        handleReadNotification(id);
      }}
    >
      {!isRead && (
        <IconCircleFilled
          size={10}
          color={theme.colors.red[4]}
          style={{ position: 'absolute', top: '.3rem', right: '.3rem' }}
        />
      )}

      <Group justify='space-between'>
        <Stack gap={2} style={{ flex: 1 }}>
          <Text fw={isRead ? 400 : 600} fz={'sm'}>
            {title}
          </Text>
          <Text fz='xs' c='dimmed' fw={isRead ? 400 : 500}>
            {message}
          </Text>
        </Stack>
        <Badge
          color={isRead ? 'gray' : 'dark'}
          variant='transparent'
          tt={'none'}
          fw={isRead ? 'normal' : 'bold'}
        >
          {dayjs(createdAt).isBefore(dayjs().subtract(2, 'months'))
            ? dayjs(createdAt).format('MMM D, YYYY')
            : dayjs(createdAt).fromNow()}
        </Badge>
      </Group>
    </Card>
  );
};
