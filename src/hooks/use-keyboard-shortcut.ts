import { useEffect } from 'react';

type KeyboardShortcut = {
  key: string;
  withCtrlKey?: boolean;
  callback: () => void;
};

/**
 * React hook for binding a keyboard shortcut to a callback.
 * @param {Object} params - Shortcut config.
 * @param {string} params.key - Key to listen for.
 * @param {boolean=} params.withCtrlKey - Whether Ctrl must be held.
 * @param {function} params.callback - Callback to invoke on shortcut.
 */
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
