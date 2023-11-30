import { Accordion, AccordionDetails, Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAccordion = styled(Accordion)``;

export const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.background.activeHover};
  }
`;

export const StyledContainer = styled(Box)`
  display: flex;
  align-items: center;
`;
