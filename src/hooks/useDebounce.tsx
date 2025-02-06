import {useEffect, useState} from "react";

interface UseDebounceProps<T> {
  value: T;
  delay: number;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  hasInteracted: boolean;
}

export function useDebounce<T>({value, delay, setIsSaving, hasInteracted}: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    setIsSaving(hasInteracted);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setIsSaving, hasInteracted]);

  return debouncedValue;
}
