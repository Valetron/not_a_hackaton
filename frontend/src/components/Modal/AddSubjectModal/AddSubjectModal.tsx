import BaseModal from '@/components/Modal/BaseModal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import React from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { StyledForm } from '@/components/Modal/AddSubjectModal/AddSubjectModal.styled';

interface AddSubjectModalProps {
  open: boolean;
  onModalSubmit: (name: HackathonApi.UniversityInputDTO['name']) => Promise<void>;
  onModalClose: () => void;
}

interface AddSubjectModalInputs {
  name: string;
}

const AddSubjectModal = ({ open, onModalClose, onModalSubmit }: AddSubjectModalProps) => {
  const { control, handleSubmit, formState, clearErrors } = useForm<AddSubjectModalInputs>();

  const onSubmit: SubmitHandler<AddSubjectModalInputs> = async (data) => {
    await onModalSubmit(data.name);
  };

  const handleCloseModal = () => {
    onModalClose();
    clearErrors();
  };

  return (
    <BaseModal open={open} fullWidth title={'Добавление дисциплины'} onModalClose={handleCloseModal}>
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
                id="subjectName"
                label="Название дисциплины"
                autoFocus
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

export default AddSubjectModal;
