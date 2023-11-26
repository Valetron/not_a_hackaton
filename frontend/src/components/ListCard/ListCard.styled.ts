import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledCardWrapper = styled(Box)`
  display: flex;
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.palette.background.tables};
  border-radius: 16px;
  font-size: 24px;
  font-weight: 500;
  gap: 24px;

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
