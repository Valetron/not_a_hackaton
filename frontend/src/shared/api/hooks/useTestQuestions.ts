import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { getAnswersForQuesiton } from '@/shared/api/fetchers/questionFetcher';
import { useEffect, useMemo, useState } from 'react';

interface QuestionsWithAnswersProps extends HackathonApi.ResultQuestionDTO {
  answers: HackathonApi.ResultAnswerDTO[];
}

export const useTestQuestions = (testId: number) => {
  const {
    data: testQuestions,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.ResultQuestionDTO[]>(
    testId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/result-question/${testId}` : undefined,
  );

  const [fullData, setFullData] = useState<QuestionsWithAnswersProps[]>([]);

  const fetchAnswersForQuestions = async (questionId: number) => {
    try {
      return await getAnswersForQuesiton(questionId);
    } catch {
      return [];
    }
  };

  const fetchData = async () => {
    if (!testQuestions) {
      return [];
    }

    const questionsWithAnswers: QuestionsWithAnswersProps[] = [];

    for (const testQuestion of testQuestions) {
      const answers = await fetchAnswersForQuestions(testQuestion.id!);
      questionsWithAnswers.push({
        ...testQuestion,
        answers,
      });
    }

    setFullData(questionsWithAnswers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    fullData,
    isLoading,
    mutate,
    error,
  };
};
