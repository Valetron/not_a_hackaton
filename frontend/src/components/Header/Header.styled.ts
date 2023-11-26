import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledHeader = styled(Box)`
  height: 72px;
  width: 100vw;
  padding: 0 32px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.white};
  font-weight: 500;
  font-size: 32px;
`;

export const StyledHeaderContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
