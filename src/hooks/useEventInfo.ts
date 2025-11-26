import { useFormContext, useWatch } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';

export const useEventInfo = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const [band] = useWatch({
    name: ['band'],
    control
  });

  return { band };
};
