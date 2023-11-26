import { Box, styled } from '@mui/material';

export const StyledButtonWrapper = styled(Box)`
  margin-top: 16px;
  display: flex;
  gap: 16px;
`;

export const StyledCreationBox = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: calc(100vh - 300px);
`;

export const StyledCreationQuestions = styled(Box)`
  width: 50%;
  height: 100%;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;
