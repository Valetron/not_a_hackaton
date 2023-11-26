import { Box, styled, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  margin-bottom: 20px;
`;

export const StyledWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  justify-content: center;
  padding: 8px 0;
`;

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
