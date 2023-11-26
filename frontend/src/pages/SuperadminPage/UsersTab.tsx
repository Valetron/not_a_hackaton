// UsersTab.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledTableContainer = styled(TableContainer)`
  margin-bottom: 20px;
`;

const StyledTable = styled(Table)`
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-collapse: collapse;
  width: 100%;
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.palette.primary.bg};
`;

const StyledTableCell = styled(TableCell)`
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  padding: 12px;
  font-weight: bold;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.background.tables};
  }
`;

const UsersTab: React.FC = () => {
  // Assuming you have user data, replace this with your actual data
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    // Add more users as needed
  ];

  return (
    <>
      <Box
        sx={{
          paddingBottom: '8px',
        }}
      >
        <Button variant={'contained'}>Добавить пользователя</Button>
      </Box>
      <StyledTableContainer>
        <StyledTable>
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>{user.id}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </>
  );
};

export default UsersTab;
