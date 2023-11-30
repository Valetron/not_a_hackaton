import { HackathonApi } from '@/shared/api/HackathonApi';
import { API } from '@/shared/api/api';

export const createQuestion = (data: HackathonApi.QuestionInputDTO, questionGroupId: number) =>
  API.$post('/question/{questionGroupId}', data, {
    params: {
      questionGroupId,
    },
  });

export const createAnswers = (data: HackathonApi.AnswerInputDTO[], questionIds: number) =>
  API.$post('/answer/{questionIds}', data, {
    params: {
      questionIds,
    },
  });

export const getAnswersForQuesiton = (questionId: number) =>
  API.$get('/result-answer/{questionId}', {
    params: {
      questionId,
    },
  });
