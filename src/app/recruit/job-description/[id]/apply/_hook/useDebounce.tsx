import { useEffect, useState } from "react";
import { FormType } from "../_types/FormTypes";

export const useDebounce = (
  value: FormType,
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
