import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';
import type { PersonCalculated } from 'types/worksheet';

export const useSignatures = () => {
  const { setValue, getValues } = useFormContext<WorksheetFormData>();

  const addSignature = (person: PersonCalculated, signature: string) => {
    console.log('person', person);
    const personIndex = getValues('talent').findIndex(p => p.name === person.name);
    if (personIndex !== -1) {
      setValue(`talent.${personIndex}.signature`, signature, { shouldDirty: true });
    } else {
      console.error(`Person with name ${person.name} not found in talent array.`);
    }
  };

  return { addSignature };
};
