export interface IGetNotificationsResponse {
  data: {
    id: string;
    userId: string;
    title: string;
    message: string;
    readAt: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  count: number;
  message: string;
}

export type Notification = IGetNotificationsResponse['data'][number];
export type IGetCountNotificationsResponse = Omit<
  IGetNotificationsResponse,
  'data'
>;
