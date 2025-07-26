import { useFormContext, useWatch } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';

export const useTalent = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const [talent, guarantee] = useWatch({
    name: ['talent', 'guarantee'],
    control
  });

  const mappedTalent = talent.map((t) => ({
    name: t.name,
    role: t.role,
    travel: Number(t.travel) || 0
  }));

  return {
    talent: mappedTalent,
    guarantee: Number(guarantee) || 0
  };
};
