import BaseModal from '@/components/Modal/BaseModal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import React from 'react';
import { StyledForm } from '@/components/Modal/AddUniversityModal/AddUniversityModal.styled';
import { HackathonApi } from '@/shared/api/HackathonApi';

interface AddUniversityModalProps {
  open: boolean;
  onModalSubmit: (data: HackathonApi.UniversityInputDTO) => Promise<void>;
  onModalClose: () => void;
}

interface AddUniversityModalInputs {
  name: string;
  description?: string;
}

const AddUniversityModal = ({ open, onModalClose, onModalSubmit }: AddUniversityModalProps) => {
  const { control, handleSubmit, formState, clearErrors } = useForm<AddUniversityModalInputs>();

  const onSubmit: SubmitHandler<AddUniversityModalInputs> = async (data) => {
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
                id="universityName"
                label="Название университета"
                autoFocus
                error={!!formState.errors.name}
              />
              {formState.errors.name && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
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
                id="universityDesc"
                label="Описание университета"
                error={!!formState.errors.name}
              />
              {formState.errors.name && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
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

export default AddUniversityModal;
