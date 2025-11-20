import { create } from 'zustand';

import { Notification } from '@/app/(types)/api';

import { AuthUser } from '../(types)/api';

interface AuthState {
  authUser?: AuthUser;
  notifications?: Notification[];
  setAuthUser: (authUser?: AuthUser) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: undefined,
  setAuthUser: (authUser) => set({ authUser }),
}));
