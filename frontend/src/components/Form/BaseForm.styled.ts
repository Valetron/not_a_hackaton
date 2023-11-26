import { Box, FormHelperText, styled, TextField, Typography } from '@mui/material';

export const RegisterPageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.primary.bg};
`;

export const StyledFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 64px 128px;
  box-shadow: 0 0 10px 2px ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  backdrop-filter: blur(25px);
`;

export const StyledForm = styled('form')`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 270px;
`;

export const StyledInput = styled(TextField)`
  width: 100%;
`;

export const StyledTypographyBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 0 20px 20px;
  padding: 16px;
  color: ${({ theme }) => theme.palette.primary.contrastText};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    width: 30px;
    height: 30px;
    border-top-right-radius: 50%;
    background: transparent;
    box-shadow: 15px 0 0 0 ${({ theme }) => theme.palette.primary.main};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -30px;
    width: 30px;
    height: 30px;
    border-top-left-radius: 50%;
    background: transparent;
    box-shadow: -15px 0 0 0 ${({ theme }) => theme.palette.primary.main};
  }
`;

export const StyledTypography = styled(Typography)``;

export const StyledTextHelper = styled(FormHelperText)`
  visibility: visible;
  position: absolute;
  margin-bottom: 8px;
`;
