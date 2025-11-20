import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IGetAuthUserResponse } from '../(types)/api';

export const useAuthLogin = () =>
  useMutation({
    mutationKey: ['auth-login'],
    mutationFn: async (credential: { username: string; password: string }) => {
      await axios.post('/api/auth/login', credential);
    },
  });

export const useAuthLogout = () =>
  useMutation({
    mutationKey: ['auth-logout'],
    mutationFn: async () => {
      await axios.post('/api/auth/logout');
    },
  });

export const useAuthUser = () =>
  useMutation({
    mutationKey: ['auth-user'],
    mutationFn: async () => {
      const response = await axios.get<IGetAuthUserResponse>('/api/auth/user');
      return response.data;
    },
  });
