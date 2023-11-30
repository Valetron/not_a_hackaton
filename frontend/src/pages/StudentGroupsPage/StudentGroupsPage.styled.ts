import { Box, styled } from '@mui/material';

export const StyledGroupsListWrapper = styled(Box)`
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  justify-content: center;
  padding: 8px 0;
`;
