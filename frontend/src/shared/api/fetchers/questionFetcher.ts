import { HackathonApi } from '@/shared/api/HackathonApi';
import { API } from '@/shared/api/api';

export const createQuestion = (data: HackathonApi.QuestionInputDTO, questionGroupId: number) =>
  API.$post('/question/{questionGroupId}', data, {
    params: {
      questionGroupId,
    },
  });

export const createAnswers = (data: HackathonApi.AnswerInputDTO[], questionId: number) =>
  API.$post('/answer/{questionId}', data, {
    params: {
      questionId,
    },
  });
