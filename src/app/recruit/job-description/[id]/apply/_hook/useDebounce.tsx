import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number, isSavedRef: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    isSavedRef.current = false;
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      isSavedRef.current = true;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isSavedRef]);

  return debouncedValue;
};
