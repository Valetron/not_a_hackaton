import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HackathonApi } from '@/shared/api/HackathonApi';
import React, { FC } from 'react';
import BaseModal from '@/components/Modal/BaseModal';
import { StyledForm } from '@/components/Modal/AddSubjectModal/AddSubjectModal.styled';
import { Box, Button } from '@mui/material';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';

interface AddQuestionGroupModalProps {
  open: boolean;
  onModalSubmit: (name: HackathonApi.QuestionBaseInputDTO['name']) => Promise<void>;
  onModalClose: () => void;
}

interface AddQuestionGroupModalInputs {
  name: string;
}

const AddQuestionGroupModal: FC<AddQuestionGroupModalProps> = ({ open, onModalClose, onModalSubmit }) => {
  const { control, handleSubmit, formState, clearErrors } = useForm<AddQuestionGroupModalInputs>();

  const onSubmit: SubmitHandler<AddQuestionGroupModalInputs> = async (data) => {
    await onModalSubmit(data.name);
  };

  const handleCloseModal = () => {
    onModalClose();
    clearErrors();
  };

  return (
    <BaseModal open={open} fullWidth title="Добавление групп вопросов" onModalClose={handleCloseModal}>
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
                id="questionGroupName"
                label="Название группы вопросов"
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

export default AddQuestionGroupModal;
