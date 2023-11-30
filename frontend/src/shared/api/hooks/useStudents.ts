import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useStudents = (groupId: number) => {
  const {
    data: studentsList,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.StudentOutputDTO[]>(
    groupId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/student/${groupId}` : undefined,
  );

  return {
    studentsList,
    isLoading,
    mutate,
    error,
  };
};
