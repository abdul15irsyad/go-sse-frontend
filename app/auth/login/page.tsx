'use client';

import {
  Button,
  Container,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEye, IconEyeClosed, IconLogin } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAuthLogin, useAuthUser } from '../(hooks)/api';
import { useAuthStore } from '../(stores)/auth.store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthLogin();
  const { setAuthUser } = useAuthStore();
  const authUser = useAuthUser();

  const form = useForm({
    initialValues: {
      username: 'abdul',
      password: 'Qwerty123',
    },
  });

  const handleSubmit = useCallback(
    async (data: typeof form.values) => {
      try {
        await login.mutateAsync(data);
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'login success',
        });
        const response = await authUser.mutateAsync();
        setAuthUser(response.data);
        router.push('/');
      } catch (error) {
        console.error(error);
        notifications.show({
          color: 'red',
          title: 'Failed',
          message: 'login failed',
        });
      }
    },
    [authUser, form, login, router, setAuthUser],
  );

  return (
    <Flex
      justify='center'
      align='center'
      style={{ height: '100dvh' }}
      bg='gray.1'
    >
      <Container fluid>
        <Paper radius='lg' p='lg' withBorder miw='400px'>
          <Text size='lg' pb='lg' fw={800} ta={'center'}>
            Login
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                {...form.getInputProps('username')}
                withAsterisk
                label='Username'
                placeholder='johndoe'
                radius='md'
              />
              <PasswordInput
                {...form.getInputProps('password')}
                withAsterisk
                label='Password'
                placeholder='Your password'
                radius='md'
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <IconEyeClosed size='1em' /> : <IconEye size='1em' />
                }
              />
            </Stack>
            <Group justify='end' mt='xl'>
              <Button
                leftSection={<IconLogin size='1em' />}
                type='submit'
                radius='md'
              >
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Flex>
  );
}
