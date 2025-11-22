import { Avatar, Box, Button, Card, Grid, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHandClick } from '@tabler/icons-react';
import React, { useCallback } from 'react';

import { useAuthFriends, usePokeFriend } from '../(hooks)/api';
import { User } from '../(types)/api';

export const FriendsPanel = ({ activeTab }: { activeTab: string | null }) => {
  const authFriends = useAuthFriends({ enabled: activeTab === 'friends' });
  const pokeFriend = usePokeFriend();

  const handlePoke = useCallback(
    async (friend: User) => {
      await pokeFriend.mutateAsync(friend.id);
      notifications.show({
        color: 'green',
        title: 'Success',
        message: `${friend.name} poked`,
      });
    },
    [pokeFriend],
  );

  return (
    <Box py={'sm'}>
      <Grid>
        {authFriends?.data?.data?.map((friend) => (
          <Grid.Col key={friend.id} span={{ base: 12, sm: 3, xs: 6 }}>
            <Card
              withBorder
              radius='md'
              p='md'
              style={{ alignItems: 'center' }}
            >
              <Avatar size={'xl'} mb={'xs'}>
                {friend.name.charAt(0)}
              </Avatar>
              <Box ta={'center'} mb={'md'}>
                <Text size='xl' fw='bolder' c={'dark.5'}>
                  {friend.name}
                </Text>
                <Text size='xs' c={'dark.3'}>
                  {friend.username}
                </Text>
              </Box>
              <Button
                color='dark'
                leftSection={<IconHandClick size='1em' />}
                size='xs'
                variant='light'
                onClick={() => handlePoke(friend)}
                loading={
                  pokeFriend.variables === friend.id && pokeFriend.isPending
                }
                disabled={
                  pokeFriend.variables === friend.id && pokeFriend.isPending
                }
              >
                Poke
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
