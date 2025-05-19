import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  const toastHandler = ({ title, description, duration = 3000 }) => {
    setToast({ title, description });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return {
    toast: toastHandler,
    currentToast: toast,
  };
}
