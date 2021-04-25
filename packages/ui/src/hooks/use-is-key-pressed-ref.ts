import { useEffect, useRef } from 'react';

type TProps = {
  key: string;
};
export const useIsKeyPressedRef = ({ key }: TProps) => {
  const isPressedRef = useRef(false);
  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === key) {
        isPressedRef.current = true;
      }
    };
    const keyUpListener = (e: KeyboardEvent) => {
      if (e.key === key) {
        isPressedRef.current = false;
      }
    };
    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);
    return () => {
      window.removeEventListener('keydown', keyDownListener);
      window.removeEventListener('keyup', keyUpListener);
    };
  }, [key]);
  return isPressedRef;
};
