import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useUniversitiesList = () => {
  const {
    data: universitiesList,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.UniversityOutputDTO[]>(`${import.meta.env.VITE_BASE_BACKEND_URL}/university`);

  return {
    universitiesList,
    isLoading,
    mutate,
    error,
  };
};
