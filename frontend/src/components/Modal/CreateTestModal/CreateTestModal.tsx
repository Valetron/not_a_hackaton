import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import BaseModal from '@/components/Modal/BaseModal';
import { StyledForm } from '@/components/Modal/AddUniversityModal/AddUniversityModal.styled';
import { Box, Button } from '@mui/material';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import React from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';

interface CreateTestModalProps {
  open: boolean;
  onModalSubmit: (data: HackathonApi.TestInputDTO) => Promise<void>;
  onModalClose: () => void;
}

interface CreateTestModalInputs {
  name: string;
  link?: string;
  description: string;
  duration: number;
}

const CreateTestModal = ({ open, onModalClose, onModalSubmit }: CreateTestModalProps) => {
  const { control, handleSubmit, formState, clearErrors } = useForm<CreateTestModalInputs>();

  const onSubmit: SubmitHandler<CreateTestModalInputs> = async (data) => {
    await onModalSubmit(data);
  };

  const handleCloseModal = () => {
    onModalClose();
    clearErrors();
  };

  return (
    <BaseModal open={open} fullWidth title={'Добавление университета'} onModalClose={handleCloseModal}>
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
                label="Название теста"
                autoFocus
                error={!!formState.errors.name}
              />
              {formState.errors.name && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Controller
          name="link"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="description"
                label="Ссылка на тест"
                error={!!formState.errors.name}
              />
            </Box>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="universityDesc"
                label="Описание теста"
                error={!!formState.errors.description}
              />
              {formState.errors.description && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
            </Box>
          )}
        />
        <Controller
          name="duration"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <StyledInput
                {...field}
                variant="outlined"
                id="duration"
                label="Длительность теста"
                error={!!formState.errors.duration}
              />
              {formState.errors.duration && (
                <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
              )}
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

export default CreateTestModal;
