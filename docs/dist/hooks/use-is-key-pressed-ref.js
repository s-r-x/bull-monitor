import {useEffect, useRef} from "../../_snowpack/pkg/react.js";
export const useIsKeyPressedRef = ({key}) => {
  const isPressedRef = useRef(false);
  useEffect(() => {
    const keyDownListener = (e) => {
      if (e.key === key) {
        isPressedRef.current = true;
      }
    };
    const keyUpListener = (e) => {
      if (e.key === key) {
        isPressedRef.current = false;
      }
    };
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, [key]);
  return isPressedRef;
};
