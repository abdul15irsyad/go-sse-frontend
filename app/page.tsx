'use client';

import { Badge, Button, Container, Group, Tabs, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBell, IconHome2, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { HomePanel } from './(components)/home-panel';
import { NotificationsPanel } from './(components)/notifications-panel';
import { useCountNotification } from './(hooks)/api';
import { AuthProtected } from './auth/(components)/auth-protected';
import { useAuthLogout } from './auth/(hooks)/api';
import { useAuthStore } from './auth/(stores)/auth.store';

export default function HomePage() {
  const router = useRouter();
  const { setAuthUser } = useAuthStore();
  const logout = useAuthLogout();
  const countNotification = useCountNotification({ status: 'unread' });

  const handleLogout = useCallback(async () => {
    try {
      await logout.mutateAsync();
      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'logout success',
      });
      setAuthUser(undefined);
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      notifications.show({
        color: 'red',
        title: 'Failed',
        message: 'logout failed',
      });
    }
  }, [logout, router, setAuthUser]);

  return (
    <AuthProtected>
      <Container size='xs' py='xl' mih='100dvh'>
        <Group justify='space-between' mb='lg'>
          <Title size='h3'>Golang Next Notification</Title>
          <Button
            color='red.7'
            leftSection={<IconLogout size='1em' />}
            onClick={handleLogout}
            radius='md'
            size='xs'
          >
            Logout
          </Button>
        </Group>

        <Tabs defaultValue='home' color='dark'>
          <Tabs.List>
            <Tabs.Tab value='home' leftSection={<IconHome2 size={'1.25em'} />}>
              Home
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
          <Tabs.Panel value='notifications'>
            <NotificationsPanel countNotification={countNotification} />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </AuthProtected>
  );
}
