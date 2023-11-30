import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useStudentGroups = (universityId?: number) => {
  const {
    data: studentGroups,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.StudentGroupOutputDTO[]>(
    universityId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/student-group/${universityId}` : undefined,
  );

  return {
    studentGroups,
    isLoading,
    mutate,
    error,
  };
};
