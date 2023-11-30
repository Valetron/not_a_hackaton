import { HackathonApi } from '@/shared/api/HackathonApi';
import { API } from '@/shared/api/api';

export const createTest = (data: HackathonApi.TestInputDTO, subjectId: number) =>
  API.$post('/test/{subjectId}', data, {
    params: {
      subjectId,
    },
  });

export const addQuestionsToTest = (data: number[], testId: number) =>
  API.$post('/test/add-question/{testId}', data, {
    params: {
      testId,
    },
  });

export const activateTest = (studentsIds: number[], testId: number) =>
  API.$post('/active-test/{testId}', studentsIds, {
    params: {
      testId,
    },
  });
