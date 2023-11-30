import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TestCardStyledWrapper = styled(Box)`
  display: grid;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 156px;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 1px 2px 0px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
  }
`;

export const TestCardStyledTitle = styled(Box)`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
