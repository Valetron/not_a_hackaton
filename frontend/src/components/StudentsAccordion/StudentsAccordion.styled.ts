import { AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAccordionSummary = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    display: flex;
    justify-items: center;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 16px 32px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.background.activeHover};
  }
`;

export const StyledAccordionWrapper = styled(Box)`
  display: flex;
  gap: 8px;
  width: 100%;
`;
