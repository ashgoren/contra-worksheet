import { createContext, useContext, useState, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';
import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material';

interface Notification {
  message: string;
  severity: AlertColor;
}

interface NotificationContextValue {
  notify: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = useCallback((message: string, severity: AlertColor = 'error') => {
    setNotification({ message, severity });
  }, []);

  const handleClose = (_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={!!notification}
        onClose={handleClose}
        autoHideDuration={notification?.severity === 'error' ? null : 6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={notification?.severity} variant='filled' sx={{ width: '100%' }}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
