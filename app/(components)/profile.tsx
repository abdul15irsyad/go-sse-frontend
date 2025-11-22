import { Avatar, Box, Group, Menu, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAuthLogout } from '../auth/(hooks)/api';
import { useAuthStore } from '../auth/(stores)/auth.store';
import styles from './profile.module.css';

export const ProfileMenu = () => {
  const router = useRouter();
  const { authUser, setAuthUser } = useAuthStore();
  const logout = useAuthLogout();

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
    } catch {
      notifications.show({
        color: 'red',
        title: 'Failed',
        message: 'logout failed',
      });
    }
  }, [logout, router, setAuthUser]);

  return (
    <Menu shadow='md' width={160} position='bottom-end'>
      <Menu.Target>
        <Group gap='xs' className={styles['profile-button']}>
          <Avatar radius='xl' size='sm'>
            {authUser?.name[0]}
          </Avatar>
          <Box>
            <Text size='sm' fw={500} mb={0}>
              {authUser?.name}
            </Text>
            {/* <Text size='xs' c='dimmed'>
              {authUser?.username}
            </Text> */}
          </Box>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser size='1em' />} disabled>
          Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          leftSection={<IconLogout size='1em' />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
