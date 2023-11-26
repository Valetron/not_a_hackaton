import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import BaseForm from '@/components/Form/BaseForm';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { useToast } from '@/providers/ToastProvider/ToastProvider';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<LoginFormInputs>();
  const { successToast, errorToast } = useToast();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    successToast('Успешная регистрация');
    // Обработка отправки формы, например, вызов API для проверки учетных данных
    console.log(data);
  };

  return (
    <BaseForm formTitle="Вход" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Box>
            <StyledInput
              {...field}
              variant="outlined"
              id="username"
              label="Имя пользователя"
              autoFocus
              error={!!formState.errors.username}
            />
            {formState.errors.username && (
              <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
            )}
          </Box>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Box>
            <StyledInput {...field} id="password" label="Пароль" type="password" error={!!formState.errors.password} />
            {formState.errors.password && (
              <StyledTextHelper error>Это поле обязательно для заполнения</StyledTextHelper>
            )}
          </Box>
        )}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Войти
      </Button>
    </BaseForm>
  );
};

export default LoginPage;
