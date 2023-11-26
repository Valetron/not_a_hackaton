import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const AddSubjectModalStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 64px 128px;
  box-shadow: 0 0 10px 2px ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
