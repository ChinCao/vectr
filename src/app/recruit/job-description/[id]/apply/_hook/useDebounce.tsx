import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number, setIsSavedRef: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    setIsSavedRef(false);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setIsSavedRef]);

  return debouncedValue;
};
