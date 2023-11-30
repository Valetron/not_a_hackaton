import { Box, styled } from '@mui/material';

export const StyledButtonWrapper = styled(Box)`
  display: flex;
  gap: 16px;
`;

export const StyledQuestionBaseListWrapper = styled(Box)`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 8px 0;
  max-height: calc(100vh - 250px);
`;
