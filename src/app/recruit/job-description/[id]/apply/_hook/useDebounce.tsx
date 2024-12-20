import {useEffect, useState} from "react";
import {FormType} from "../_types/FormTypes";

export const useDebounce = (value: FormType, delay: number, setIsSaving: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    setIsSaving(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setIsSaving]);

  return debouncedValue;
};
