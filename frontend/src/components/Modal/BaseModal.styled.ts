import { styled } from '@mui/system';
import { Box, Dialog } from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-root {
    border-radius: 0;
  }

  .MuiBackdrop-root {
    backdrop-filter: blur(3px);
  }
`;

export const StyledTypographyBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 0 20px 20px;
  padding: 16px;
  color: ${({ theme }) => theme.palette.primary.contrastText};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    width: 30px;
    height: 30px;
    border-top-right-radius: 50%;
    background: transparent;
    box-shadow: 15px 0 0 0 ${({ theme }) => theme.palette.primary.main};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -30px;
    width: 30px;
    height: 30px;
    border-top-left-radius: 50%;
    background: transparent;
    box-shadow: -15px 0 0 0 ${({ theme }) => theme.palette.primary.main};
  }
`;
