import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';

export const useLocalStorage = () => {
  const { getValues } = useFormContext<WorksheetFormData>();

  const saveToLocalStorage = useCallback(() => {
    const data = getValues();
    localStorage.setItem('worksheetData', JSON.stringify(data));
  }, [getValues]);

  return { saveToLocalStorage };
};
