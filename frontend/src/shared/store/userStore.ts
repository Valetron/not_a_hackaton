import { create } from 'zustand';

import { HackathonApi } from '@/shared/api/HackathonApi';
import { loginUser } from '@/shared/api/fetchers/userFetcher';

interface UserStore {
  user: HackathonApi.UserOutputDTO | null;
  logIn: (loggingUser: HackathonApi.UserInputDTO) => Promise<void>;
  logOut: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  logIn: async (loggingUser) => {
    try {
      set({ isLoading: true });
      const userInfo = await loginUser(loggingUser);
      set({ user: userInfo, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false, error: 'error' });
    }
  },

  logOut: () => set({ user: null }),
}));
