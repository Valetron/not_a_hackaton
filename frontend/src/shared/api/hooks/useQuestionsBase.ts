import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useQuestionsBase = (subjectId: HackathonApi.SubjectOutputDTO['id']) => {
  const {
    data: questionsBase,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.QuestionBaseOutputDTO[]>(
    subjectId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/question-base/get-all/${subjectId}` : undefined,
  );

  return {
    questionsBase,
    isLoading,
    mutate,
    error,
  };
};
