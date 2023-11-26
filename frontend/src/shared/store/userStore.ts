// import { create } from 'zustand';
// import { logIn, refreshTokens } from '@/shared/fetchers/authFetcher';
// import { PippApi } from '@/shared/api/PippApi';
// import { decode } from 'jsonwebtoken';
//
// interface UserStore {
//   user: PippApi.UserOut | null;
//   accessToken: PippApi.Token['accessToken'] | null;
//   logIn: (loggingUser: PippApi.LoginInput) => Promise<void>;
//   logInUsingToken: (token: PippApi.Token) => void;
//   logOut: () => void;
//   refreshToken: () => Promise<void>;
//   isLoading: boolean;
//   error: string | null;
// }
//
// export const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   accessToken: null,
//   isLoading: false,
//   error: null,
//
//   logIn: async (loggingUser) => {
//     try {
//       const token = await logIn(loggingUser);
//       const accessTokenPayload = decode(token.accessToken) as PippApi.UserOut;
//       set({ user: accessTokenPayload, accessToken: token.accessToken });
//     } catch (error) {
//       set({ user: null, accessToken: null, isLoading: false, error: 'error' });
//     }
//   },
//
//   logInUsingToken: async (token: PippApi.Token) => {
//     try {
//       const accessTokenPayload = decode(token.accessToken) as PippApi.UserOut;
//       console.log(accessTokenPayload);
//       set({ user: accessTokenPayload, accessToken: token.accessToken });
//     } catch (e) {
//       set({ user: null, accessToken: null, isLoading: false, error: 'error' });
//     }
//   },
//
//   logOut: () => set({ user: null, accessToken: null }),
//
//   refreshToken: async () => {
//     try {
//       const tokens = await refreshTokens();
//       const accessTokenPayload = decode(tokens.accessToken) as PippApi.UserOut;
//       set({ user: accessTokenPayload, accessToken: tokens.accessToken });
//     } catch {
//       return set({ user: null, accessToken: null });
//     }
//   },
// }));
