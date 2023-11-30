import { Box, Select, styled } from '@mui/material';

export const StyledTabWrapper = styled(Box)`
  padding: 0 128px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 334px);
`;

export const StyledSelect = styled(Select)`
  width: 400px;
`;

export const StyledButtonWrapper = styled(Box)`
  position: absolute;
  right: 172px;
  gap: 16px;
`;

export const StyledListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
