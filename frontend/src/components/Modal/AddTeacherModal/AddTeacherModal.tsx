import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyledForm } from '@/components/Modal/AddSubjectModal/AddSubjectModal.styled';
import { Box, Button, InputLabel, MenuItem, Select } from '@mui/material';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import BaseModal from '@/components/Modal/BaseModal';
import React, { FC } from 'react';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { useUniversitiesList } from '@/shared/api/hooks/useUniversitiesList';
import { StyledSelect } from '@/components/Modal/AddTeacherModal/AddTeacherModal.styled';
import { createTeacher } from '@/shared/api/fetchers/userFetcher';

interface AddTeacherModalInput {
  name: string;
  surname: string;
  patronymic: string;
  description: string;
  email: string;
  phone: string;
  password: string;
  universityId: number;
}

interface AddSubjectModalProps {
  title: string;
  open: boolean;
  onModalClose: () => void;
}

const AddTeacherModal: FC<AddSubjectModalProps> = ({ title, open, onModalClose }) => {
  const { successToast, errorToast } = useToast();
  const { universitiesList } = useUniversitiesList();

  const { control, handleSubmit, formState, clearErrors, reset } = useForm<AddTeacherModalInput>();

  const onSubmit: SubmitHandler<AddTeacherModalInput> = async (data) => {
    try {
      const teacher = {
        ...data,
        role: 'TEACHER',
      };

      await createTeacher(teacher);
      successToast('Зарегестрирован преподаватель');
    } catch {
      errorToast('Неудачно создал');
    }
  };

  const handleCloseModal = () => {
    onModalClose();
    clearErrors();
    reset();
  };

  return (
    <BaseModal open={open} fullWidth title={title} onModalClose={handleCloseModal}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="name"
                label="Имя"
                autoFocus
                error={!!formState.errors.name}
              />
              {formState.errors.name && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Controller
          name="surname"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="surname"
                label="Фамилия"
                autoFocus
                error={!!formState.errors.surname}
              />
              {formState.errors.surname && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
            </Box>
          )}
        />
        <Controller
          name="patronymic"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="patronymic"
                label="Отчество"
                autoFocus
                error={!!formState.errors.patronymic}
              />
              {formState.errors.patronymic && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
            </Box>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="description"
                label="Описание"
                autoFocus
                error={!!formState.errors.description}
              />
              {formState.errors.description && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
            </Box>
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="email"
                label="Электронная почта"
                autoFocus
                error={!!formState.errors.email}
              />
              {formState.errors.email && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="phone"
                label="Номер телефона"
                autoFocus
                error={!!formState.errors.phone}
              />
              {formState.errors.phone && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="password"
                label="Пароль"
                type="password"
                autoFocus
                error={!!formState.errors.password}
              />
              {formState.errors.password && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
            </Box>
          )}
        />
        <Controller
          name="universityId"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Box>
              <InputLabel>Университет</InputLabel>
              <StyledSelect {...field} variant="outlined" id="phone" autoFocus error={!!formState.errors.phone}>
                {universitiesList?.map((uni) => <MenuItem value={uni.id}>{uni.name}</MenuItem>)}
              </StyledSelect>
              {formState.errors.phone && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={onModalClose} sx={{ bgcolor: 'gray', width: '45%' }}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ width: '45%' }}>
            Сохранить
          </Button>
        </Box>
      </StyledForm>
    </BaseModal>
  );
};

export default AddTeacherModal;
