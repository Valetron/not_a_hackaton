import useSWR from 'swr';

export const useQuestionBaseInfo = (questionBaseId: number) => {
  const {
    data: questionBaseInfo,
    isLoading,
    mutate,
    error,
  } = useSWR(
    questionBaseId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/question-base/get-one/${questionBaseId}` : undefined,
  );

  return {
    questionBaseInfo,
    isLoading,
    mutate,
    error,
  };
};
