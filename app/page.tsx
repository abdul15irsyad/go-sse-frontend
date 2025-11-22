'use client';

import { Badge, Container, Group, Tabs, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBell, IconHome2, IconUsers } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { FriendsPanel } from './(components)/friends-panel';
import { HomePanel } from './(components)/home-panel';
import { NotificationsPanel } from './(components)/notifications-panel';
import { ProfileMenu } from './(components)/profile';
import { useCountNotification, useNotification } from './(hooks)/api';
import { AuthProtected } from './auth/(components)/auth-protected';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string | null>('home');
  const [page, setPage] = useState<number>(1);
  const countNotification = useCountNotification({ status: 'unread' });
  const userNotifications = useNotification({
    status: 'all',
    page,
  });

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
      const data = JSON.parse(event.data);
      await countNotification.refetch();
      await userNotifications.refetch();
      console.log(data);
      notifications.show({
        color: 'green',
        title: data?.title,
        message: data?.message,
      });
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => eventSource.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthProtected>
      <Container size='md' py='sm' mih='100dvh'>
        <Group justify='space-between' mb='lg'>
          <Title size='h3'>SSE Notification</Title>
          <ProfileMenu />
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab} color='dark'>
          <Tabs.List>
            <Tabs.Tab value='home' leftSection={<IconHome2 size={'1.25em'} />}>
              Home
            </Tabs.Tab>
            <Tabs.Tab
              value='friends'
              leftSection={<IconUsers size={'1.25em'} />}
            >
              Friends
            </Tabs.Tab>
            <Tabs.Tab
              value='notifications'
              leftSection={<IconBell size={'1.25em'} />}
            >
              <Group gap={6} align='center'>
                Notifications
                {(countNotification.data?.count ?? 0) > 0 && (
                  <Badge size='sm' color='red'>
                    {(countNotification?.data?.count ?? 0) >= 10
                      ? '9+'
                      : countNotification?.data?.count}
                  </Badge>
                )}
              </Group>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='home'>
            <HomePanel />
          </Tabs.Panel>
          <Tabs.Panel value='friends'>
            <FriendsPanel activeTab={activeTab} />
          </Tabs.Panel>
          <Tabs.Panel value='notifications'>
            <NotificationsPanel
              countNotification={countNotification}
              userNotifications={userNotifications}
              page={page}
              setPage={setPage}
            />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </AuthProtected>
  );
}
