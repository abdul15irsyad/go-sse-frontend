export interface IGetAuthUserResponse {
  data: {
    id: string;
    name: string;
    username: string;
  };
  message: string;
}

export type AuthUser = IGetAuthUserResponse['data'];
