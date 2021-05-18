import {useState, useCallback} from "../../_snowpack/pkg/react.js";
export const useToggle = (defaultState = false) => {
  const [value, setValue] = useState(defaultState);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle, setValue];
};
