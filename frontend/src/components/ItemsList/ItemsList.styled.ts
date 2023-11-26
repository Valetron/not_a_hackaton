import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledListWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  justify-content: center;
  padding: 8px 0;
`;
