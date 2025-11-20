import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import {
  IGetCountNotificationsResponse,
  IGetNotificationsResponse,
} from '../(types)/api';

export const useNotification = ({
  status,
}: {
  status: 'read' | 'unread' | 'all';
}) =>
  useQuery({
    queryKey: ['notification', status],
    queryFn: async () => {
      const response = await axios.get<IGetNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/notif/`,
        {
          params: { status },
          withCredentials: true,
        },
      );
      return response.data;
    },
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
