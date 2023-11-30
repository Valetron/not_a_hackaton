import useSWR from 'swr';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { useMemo } from 'react';

export const useTestResult = (studentId: number) => {
  const {
    data: testResults,
    isLoading,
    mutate,
    error,
  } = useSWR<HackathonApi.ResultTestOutputDTO[]>(
    studentId ? `${import.meta.env.VITE_BASE_BACKEND_URL}/result-test/${studentId}` : undefined,
  );

  const sortedTestResults = useMemo(
    () => (testResults ? testResults.sort((a, b) => b.id! - a.id!) : []),
    [testResults],
  );

  return {
    testResults: sortedTestResults,
    isLoading,
    mutate,
    error,
  };
};
