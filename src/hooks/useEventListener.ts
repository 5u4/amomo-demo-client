import { useEffect } from "react";

export const useEventListener = (
  ref: React.RefObject<HTMLElement>,
  type: string,
  handler: (e: Event | any) => any
) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    element.addEventListener(type, handler);

    return () => {
      element.removeEventListener(type, handler);
    };
  }, [type, handler, ref]);
};
