import { HackathonApi } from '@/shared/api/HackathonApi';
import useSWR from 'swr';

export const useUniversitySubjects = (universityId?: HackathonApi.UniversityOutputDTO['id']) => {
  const {
    data: subjects,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.SubjectOutputDTO[]>(
    universityId ? `http://192.168.0.106:8080/api/subject/get-all/${universityId}` : undefined,
  );

  return {
    subjects,
    isLoading,
    mutate,
    error,
  };
};
