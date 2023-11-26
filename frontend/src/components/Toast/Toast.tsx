import { Alert, styled } from '@mui/material';
import { FC } from 'react';
import { StyledAlert } from '@/components/Toast/Toast.styled';

export interface ToastProps {
  text: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const Toast: FC<ToastProps> = ({ text, type, onClose }) => {
  return (
    <StyledAlert severity={type} onClose={onClose}>
      {text}
    </StyledAlert>
  );
};

export default Toast;
