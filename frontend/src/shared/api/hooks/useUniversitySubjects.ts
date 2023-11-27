import { HackathonApi } from '@/shared/api/HackathonApi';
import useSWR from 'swr';

export const useUniversitySubjects = (universityId?: HackathonApi.UniversityOutputDTO['id']) => {
  const {
    data: subjects,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.SubjectOutputDTO[]>(
    universityId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/subject/get-all/${universityId}` : undefined,
  );

  return {
    subjects,
    isLoading,
    mutate,
    error,
  };
};
