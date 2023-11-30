import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledLoadingContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledUserInfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledQuestionContainer = styled(Box)`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
`;
export const StyledQuestionNameWrapper = styled(Box)`
  font-size: 20px;
  font-weight: 700;
`;

export const StyledAnswerContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
`;
