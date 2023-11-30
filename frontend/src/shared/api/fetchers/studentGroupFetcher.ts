import { API } from '@/shared/api/api';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const createStudentGroup = (universityId: number, group: HackathonApi.StudentGroupInputDTO) =>
  API.$post('/student-group/{universityId}', group, {
    params: {
      universityId,
    },
  });
