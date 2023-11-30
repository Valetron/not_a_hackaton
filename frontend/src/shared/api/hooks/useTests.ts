import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useTests = (subjectId: number) => {
  const {
    data: testsList,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.TestOutputDTO[]>(
    subjectId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/test/${subjectId}` : undefined,
  );

  return {
    testsList,
    isLoading,
    mutate,
    error,
  };
};
