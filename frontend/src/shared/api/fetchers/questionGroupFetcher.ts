import { API } from '@/shared/api/api';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const createQuestionGroup = (name: HackathonApi.QuestionGroupInputDTO['name'], questionBaseId: number) =>
  API.$post(
    '/question-group/{questionBaseId}',
    { name },
    {
      params: {
        questionBaseId,
      },
    },
  );

export const getQuestionsByGroupId = (questionGroupId: number) =>
  API.$get('/question/get-all/{questionGroupId}', {
    params: {
      questionGroupId,
    },
  });
