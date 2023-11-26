import { API } from '@/shared/api/api';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const getUniversities = () => API.$get('/university');
export const createUniversity = (data: HackathonApi.UniversityInputDTO) => API.$post('/university', data);

export const getUniversityById = (id: number) =>
  API.$get('/university/{universityId}', { params: { universityId: id } });
