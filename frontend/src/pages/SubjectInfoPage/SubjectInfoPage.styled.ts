import { Box, styled } from '@mui/material';

export const StyledButtonWrapper = styled(Box)`
  gap: 16px;
  margin-bottom: 8px;
`;

export const StyledPageContentWrapper = styled(Box)`
  padding: 16px;
`;

export const StyledDisciplineListWrapper = styled(Box)`
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  justify-content: center;
  padding: 8px 0;
  max-height: calc(100vh - 340px);
`;

export const StyledCreationBox = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: calc(100vh - 334px);
`;

export const StyledCreationQuestions = styled(Box)`
  width: 50%;
  height: 100%;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;

export const StyledQuestionsList = styled(Box)`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;

export const StyledQuestionBox = styled(Box)`
  background-color: #fff;
  text-align: center;
  padding: 16px;
`;
