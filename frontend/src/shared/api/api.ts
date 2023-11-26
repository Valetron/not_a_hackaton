import { Taxios } from '@simplesmiler/taxios';
import Axios, { AxiosError } from 'axios';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const axios = Axios.create({
  baseURL: 'http://192.168.0.106:8080/api',
  withCredentials: true,
});

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return Axios.isAxiosError(error);
}

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || { message: 'Неизвестная ошибка' });
  },
);

// @TODO: авторизация

// axios.interceptors.request.use((value) => {
//   if (value.headers && useUserStore.getState().accessToken) {
//     value.headers.Authorization = `Bearer ${useUserStore.getState().accessToken}`;
//   }
//   return value;
// });

// let refreshProcess: Promise<boolean> | undefined;

// axios.interceptors.response.use(undefined, async (err) => {
//   const originalConfig = err.config;
//   if (!isAxiosError(err)) throw err;
//   if (err.response?.status === 401 && !originalConfig._isOriginalRequest) {
//     if (['/auth', '/auth/refresh'].includes(originalConfig.url)) throw err;
//     if (!refreshProcess) {
//       refreshProcess = new Promise((resolve, reject) => {
//         useUserStore
//           .getState()
//           .refreshToken()
//           .then(() => {
//             resolve(true);
//             refreshProcess = undefined;
//           })
//           .catch(() => reject());
//       });
//
//       try {
//         await refreshProcess;
//       } catch (err) {
//         throw err;
//       }
//
//       originalConfig._isOriginalRequest = true;
//
//       if (originalConfig.headers) {
//         originalConfig.headers.Authorization = `Bearer ${useUserStore.getState().accessToken}`;
//       }
//
//       return axios(originalConfig);
//     } else {
//       try {
//         await refreshProcess;
//       } catch (err) {
//         throw err;
//       }
//
//       originalConfig._isOriginalRequest = true;
//
//       if (originalConfig.headers) {
//         originalConfig.headers.Authorization = `Bearer ${useUserStore.getState().accessToken}`;
//       }
//
//       return axios(originalConfig);
//     }
//   }
//
//   throw err;
// });

export const swrFetcher = (url: string) => {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });
};

export const API = new Taxios<HackathonApi>(axios);
