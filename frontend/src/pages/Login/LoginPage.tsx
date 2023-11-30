import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import BaseForm from '@/components/Form/BaseForm';
import { StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import { StyledInput } from '@/pages/Login/LoginPage.styled';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { useUserStore } from '@/shared/store/userStore';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<LoginFormInputs>();
  const { successToast, errorToast } = useToast();

  const loginUser = useUserStore((state) => state.logIn);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await loginUser(data);
      successToast('Успешная авторизация');
    } catch {
      errorToast('Ошибка');
    }
  };

  return (
    <BaseForm formTitle="Вход" onSubmit={handleSubmit(onSubmit)}>
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
