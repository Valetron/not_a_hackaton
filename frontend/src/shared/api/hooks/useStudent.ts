import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useStudent = (studentId: number) => {
  const {
    data: studentInfo,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.StudentOutputDTO>(
    studentId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/student/info/${studentId}` : undefined,
  );

  return {
    studentInfo,
    isLoading,
    mutate,
    error,
  };
};
