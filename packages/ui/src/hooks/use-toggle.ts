import { useState, useCallback } from 'react';

export const useToggle = (
  defaultState = false
): [boolean, () => void, (v: boolean) => void] => {
  const [value, setValue] = useState(defaultState);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle, setValue];
};
