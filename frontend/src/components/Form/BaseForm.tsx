import { ReactNode } from 'react';
import {
  RegisterPageWrapper,
  StyledForm,
  StyledFormContainer,
  StyledTypographyBox,
} from '@/components/Form/BaseForm.styled';
import { Typography } from '@mui/material';

interface BaseFormProps {
  formTitle: string;
  onSubmit: () => unknown;
  children: ReactNode;
}

const BaseForm = ({ formTitle, onSubmit, children }: BaseFormProps) => {
  return (
    <RegisterPageWrapper>
      <StyledFormContainer>
        <StyledTypographyBox>
          <Typography>{formTitle}</Typography>
        </StyledTypographyBox>
        <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
      </StyledFormContainer>
    </RegisterPageWrapper>
  );
};

export default BaseForm;
