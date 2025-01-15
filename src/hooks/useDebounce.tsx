import {useEffect, useState} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (value: any, delay: number, setIsSaving: React.Dispatch<React.SetStateAction<boolean>>, hasInteracted: boolean) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    setIsSaving(hasInteracted ? true : false);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setIsSaving, hasInteracted]);

  return debouncedValue;
};
