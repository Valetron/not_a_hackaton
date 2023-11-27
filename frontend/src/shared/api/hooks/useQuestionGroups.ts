import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useQuestionGroups = (questionBaseId?: number) => {
  const {
    data: questionGroups,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.QuestionGroupOutputDTO[]>(
    questionBaseId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/question-group/get-all/${questionBaseId}` : undefined,
  );

  return {
    questionGroups,
    isLoading,
    mutate,
    error,
  };
};
