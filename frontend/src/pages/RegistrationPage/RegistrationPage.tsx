import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm, UseFormSetValue } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { StyledInput, StyledTextHelper } from '@/pages/RegistrationPage/RegistrationPage.styled';
import BaseForm from '@/components/Form/BaseForm';

interface RegistrationFormInputs {
  fullName: string;
  description: string;
  university: string;
  email: string;
  phone?: string;
  telegram: string;
}

const universities = ['Университет 1', 'Университет 2', 'Университет 3'];

const RegistrationPage: FC = () => {
  const { control, handleSubmit, setValue, formState } = useForm<RegistrationFormInputs>();

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    // Проверка на заполнение обязательных полей
    if (!data.fullName || !data.description || !data.university || !data.email || !data.telegram) {
      console.log('Заполните все обязательные поля');
      return;
    }

    // Обработка отправки формы, например, вызов API для регистрации пользователя
    console.log(data);
  };

  const handleUniversityChange = (event: SelectChangeEvent, setValue: UseFormSetValue<RegistrationFormInputs>) => {
    setValue('university', event.target.value as string);
  };

  return (
    <BaseForm formTitle="Регистрация" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <Box>
            <StyledInput {...field} id="fullName" label="ФИО" autoFocus error={!!formState.errors.fullName} />
            {formState.errors.fullName && (
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
          <StyledInput
            {...field}
            variant="outlined"
            id="description"
            label="Описание"
            multiline
            rows={3}
            error={!!formState.errors.description}
          />
        )}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="university-label">ВУЗ</InputLabel>
        <Controller
          name="university"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Box>
              <Select
                {...field}
                label="ВУЗ"
                fullWidth
                onChange={(e) => handleUniversityChange(e, setValue)}
                error={!!formState.errors.university}
              >
                {universities.map((university) => (
                  <MenuItem key={university} value={university}>
                    {university}
                  </MenuItem>
                ))}
              </Select>
              {formState.errors.university && (
                <FormHelperText error>Это поле обязательно для заполнения</FormHelperText>
              )}
            </Box>
          )}
        />
      </FormControl>
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
              error={!!formState.errors.email}
            />
            {formState.errors.email && <FormHelperText error>Это поле обязательно для заполнения</FormHelperText>}
          </Box>
        )}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => <StyledInput {...field} variant="outlined" id="phone" label="Телефон" />}
      />
      <Controller
        name="telegram"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Box>
            <StyledInput
              {...field}
              variant="outlined"
              id="telegram"
              label="Аккаунт Telegram"
              error={!!formState.errors.telegram}
            />
            {formState.errors.telegram && <FormHelperText error>Это поле обязательно для заполнения</FormHelperText>}
          </Box>
        )}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Зарегистрироваться
      </Button>
    </BaseForm>
  );
};

export default RegistrationPage;
