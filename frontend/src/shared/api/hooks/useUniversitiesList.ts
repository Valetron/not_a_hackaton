import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useUniversitiesList = () => {
  const {
    data: universitiesList,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.UniversityOutputDTO[]>('http://192.168.0.106:8080/api/university');

  return {
    universitiesList,
    isLoading,
    mutate,
    error,
  };
};
