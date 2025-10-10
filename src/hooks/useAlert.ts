import { useState } from 'react';
import { IAlert } from '../entities';

export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [alert, setAlert] = useState<IAlert>({ message: '', type: 'info' });

  const displayAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setAlert({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return { alert, showAlert, displayAlert };
};
