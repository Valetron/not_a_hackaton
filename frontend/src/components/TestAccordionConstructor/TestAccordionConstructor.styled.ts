import { Accordion, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAccordion = styled(Accordion)``;

export const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.background.activeHover};
  }
`;
