import { HackathonApi } from '@/shared/api/HackathonApi';
import { API } from '@/shared/api/api';

export const createSubject = (name: HackathonApi.SubjectInputDTO['name'], universityId: number) =>
  API.$post(
    '/subject/{universityId}',
    { name },
    {
      params: {
        universityId,
      },
    },
  );

export const getQuestionGroups = (subjectId: number) =>
  API.$get('/question-base/get-all/{subjectId}', {
    params: {
      subjectId,
    },
  });

export const getSubjectInfoById = (subjectId: number) =>
  API.$get('/subject/get-one/{subjectId}', {
    params: {
      subjectId,
    },
  });

export const pathSubject = (name: HackathonApi.SubjectInputDTO['name'], subjectId: number) =>
  API.$put(
    '/subject/{subjectId}',
    { name },
    {
      params: {
        subjectId,
      },
    },
  );
