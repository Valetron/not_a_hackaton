import { API } from '@/shared/api/api';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const createQuestionBase = (name: HackathonApi.QuestionBaseInputDTO['name'], subjectId: number) =>
  API.$post(
    '/question-base/{subjectId}',
    { name },
    {
      params: {
        subjectId,
      },
    },
  );

export const getQuestionGroups = (questionBaseId: number) =>
  API.$get('/question-group/get-all/{questionBaseId}', {
    params: {
      questionBaseId,
    },
  });
