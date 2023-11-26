import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast, { ToastProps } from '@/components/Toast/Toast';
import { Box, Portal } from '@mui/material';

interface ToastContextProps {
  successToast: (text: string) => void;
  errorToast: (text: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

interface IToast extends ToastProps {
  id: number;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const handleClose = useCallback((toastId: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== toastId));
  }, []);

  const addToast = useCallback(
    (toast: ToastProps) => {
      const timestamp = Number(new Date());
      setToasts((prev) => [...prev, { ...toast, id: timestamp }]);
      setTimeout(() => handleClose(timestamp), 2500);
    },
    [handleClose],
  );

  const successToast = useCallback(
    (text: string) => {
      addToast({ text: text, type: 'success' });
    },
    [addToast],
  );

  const errorToast = useCallback(
    (text: string) => {
      addToast({ text: text, type: 'error' });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ successToast, errorToast }}>
      {children}
      <Portal>
        <Box
          position="fixed"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          maxWidth={600}
          mb={2}
          mr={2}
          gap={1}
          sx={{ bottom: 0, right: 0 }}
          zIndex={(theme) => theme.zIndex.snackbar}
        >
          {toasts.map((toast, idx) => (
            <Box key={idx}>
              <Toast type={toast.type} text={toast.text} onClose={() => handleClose(toast.id)} />
            </Box>
          ))}
        </Box>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
