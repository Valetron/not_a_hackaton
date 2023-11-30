import React, { FC } from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';
import BaseModal from '@/components/Modal/BaseModal';
import { Box, Button } from '@mui/material';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { createStudentGroup } from '@/shared/api/fetchers/studentGroupFetcher';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import { StyledForm } from '@/components/Modal/AddSubjectModal/AddSubjectModal.styled';

interface AddStudentGroupModalProps {
  universityId: number;
  open: boolean;
  onModalClose: () => void;
  mutate: any;
}

interface StudentGroupFormInput extends HackathonApi.StudentGroupInputDTO {}

const AddStudentGroupModal: FC<AddStudentGroupModalProps> = ({ universityId, open, onModalClose, mutate }) => {
  const { control, handleSubmit, formState, clearErrors } = useForm<StudentGroupFormInput>();

  const { successToast, errorToast } = useToast();

  const onSubmit: SubmitHandler<StudentGroupFormInput> = async (data) => {
    try {
      await createStudentGroup(universityId, data as HackathonApi.StudentGroupInputDTO);
      mutate();
      successToast('Создана сущность');
      onModalClose();
    } catch {
      errorToast('Ошибка при создании сущности');
    }
  };

  return (
    <BaseModal open={open} fullWidth title="Добавление группы" onModalClose={onModalClose} data-color-mode="light">
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
                label="Название группы"
                autoFocus
                error={!!formState.errors.name}
              />
              {formState.errors.name && <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>}
            </Box>
          )}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
          Добавить группу
        </Button>
      </StyledForm>
    </BaseModal>
  );
};

export default AddStudentGroupModal;
