import { useEffect, useState } from "react";

export const useDebounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  delay: number,
  setIsSavedRef: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
