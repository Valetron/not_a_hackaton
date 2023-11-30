import { API } from '@/shared/api/api';
import { HackathonApi } from '@/shared/api/HackathonApi';

export const createTeacher = (data: HackathonApi.UserInputDTO) => API.$post('/user/registration', data);

export const loginUser = (data: HackathonApi.UserAuthDTO) => API.$post('/user/auth', data);
