import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useQuestionGroups = (questionBaseId?: number) => {
  const {
    data: questionGroups,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.QuestionGroupOutputDTO[]>(
    questionBaseId ? `http://192.168.0.106:8080/api/question-group/get-all/${questionBaseId}` : undefined,
  );

  return {
    questionGroups,
    isLoading,
    mutate,
    error,
  };
};
