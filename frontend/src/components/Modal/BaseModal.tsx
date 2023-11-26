import { StyledDialog, StyledTypographyBox } from '@/components/Modal/BaseModal.styled';
import { ReactNode } from 'react';
import { Box, Button, DialogProps, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AddUniversityModalStyled } from '@/components/Modal/AddUniversityModal/AddUniversityModal.styled';
import { CSSProperties } from '@mui/material/styles/createMixins';

interface BaseModalProps extends DialogProps {
  children: ReactNode;
  title: string;
  onModalClose: () => void;
  styleOverride?: CSSProperties;
}

const BaseModal = ({ open, title, onModalClose, children, styleOverride, ...rest }: BaseModalProps) => {
  return (
    // @ts-expect-error что-то тут не так
    <StyledDialog open={open} {...rest} onClose={onModalClose}>
      <AddUniversityModalStyled sx={styleOverride}>
        <StyledTypographyBox>
          <Typography>{title}</Typography>
        </StyledTypographyBox>
        <Box>
          <Button
            sx={{
              position: 'absolute',
              color: 'gray',
              right: 8,
              top: 8,
              padding: '8px',
            }}
            onClick={onModalClose}
          >
            <CloseIcon />
          </Button>
        </Box>
        {children}
      </AddUniversityModalStyled>
    </StyledDialog>
  );
};

export default BaseModal;
