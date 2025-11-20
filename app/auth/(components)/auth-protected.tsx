'use client';

import { Loader } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

import { useAuthUser } from '../(hooks)/api';
import { useAuthStore } from '../(stores)/auth.store';

export const AuthProtected = ({ children }: { children: ReactNode }) => {
  const getAuthUser = useAuthUser();
  const { authUser, setAuthUser } = useAuthStore();
  useEffect(() => {
    const init = async () => {
      const authUserResponse = await getAuthUser.mutateAsync();
      setAuthUser(authUserResponse.data);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return authUser ? children : <Loader />;
};
