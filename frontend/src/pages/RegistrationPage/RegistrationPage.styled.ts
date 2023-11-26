import { Box, FormHelperText, styled, TextField } from '@mui/material';

export const RegisterPageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.primary.bg};
`;

export const StyledInput = styled(TextField)`
  width: 100%;
`;

export const StyledTextHelper = styled(FormHelperText)`
  visibility: visible;
  position: absolute;
  margin-bottom: 8px;
`;
