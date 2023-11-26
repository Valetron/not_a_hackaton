import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const useQuestionsBase = (subjectId: HackathonApi.SubjectOutputDTO['id']) => {
  const {
    data: questionsBase,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.QuestionBaseOutputDTO[]>(
    subjectId ? `http://192.168.0.106:8080/api/question-base/get-all/${subjectId}` : undefined,
  );

  return {
    questionsBase,
    isLoading,
    mutate,
    error,
  };
};
