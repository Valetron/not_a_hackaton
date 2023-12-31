import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

export const StyledCardWrapper = styled(Box)`
  display: flex;
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.palette.background.tables};
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  gap: 24px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.background.activeHover};
  }
`;

export const StyledIconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledUniversityContentWrapper = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 300px;
`;

export const StyledDescription = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledEditButton = styled(Button)`
  font-size: 32px;
`;
