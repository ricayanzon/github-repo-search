import { useEffect } from 'react';

type KeyboardShortcut = {
  key: string;
  withCtrlKey?: boolean;
  callback: () => void;
};

export function useKeyboardShortcut({ key, withCtrlKey, callback }: KeyboardShortcut) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key && (!withCtrlKey || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, withCtrlKey, callback]);
}
