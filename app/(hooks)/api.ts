import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import {
  IGetCountNotificationsResponse,
  IGetNotificationsResponse,
  IGetUsersResponse,
} from '../(types)/api';

export const useNotification = ({
  page,
  status,
  enabled,
}: {
  page?: number;
  status: 'read' | 'unread' | 'all';
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ['notification', status, page],
    queryFn: async () => {
      const response = await axios.get<IGetNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/notif/`,
        {
          params: {
            status,
            page,
            limit: 5,
          },
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled: enabled ?? true,
  });

export const useCountNotification = ({
  status,
}: {
  status: 'read' | 'unread' | 'all';
}) =>
  useQuery({
    queryKey: ['notification-count', status],
    queryFn: async () => {
      const response = await axios.get<IGetCountNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/notif/count`,
        {
          params: { status },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });

export const useReadNotification = () =>
  useMutation({
    mutationKey: ['notification-read'],
    mutationFn: async (id: string) => {
      const response = await axios.get<IGetNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/notif/read/${id}`,
        { withCredentials: true },
      );
      return response.data;
    },
  });

export const useAuthFriends = ({ enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: ['auth-friends'],
    queryFn: async () => {
      const response = await axios.get<IGetUsersResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends`,
        { withCredentials: true },
      );
      return response.data;
    },
    enabled,
  });

export const usePokeFriend = () =>
  useMutation({
    mutationKey: ['poke-friend'],
    mutationFn: async (friendId: string) => {
      const response = await axios.post<{ message: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/notif/poke/${friendId}`,
        undefined,
        { withCredentials: true },
      );
      return response.data;
    },
  });
