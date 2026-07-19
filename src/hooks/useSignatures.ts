import { useFormContext } from 'react-hook-form';
import { useNotification } from 'contexts/NotificationContext';
import type { WorksheetFormData } from 'types/worksheet';
import type { PersonCalculated } from 'types/worksheet';

export const useSignatures = () => {
  const { setValue, getValues } = useFormContext<WorksheetFormData>();
  const { notify } = useNotification();

  const addSignature = (person: PersonCalculated, signature: string) => {
    console.log('person', person);
    const personIndex = getValues('talent').findIndex(p => p.name === person.name);
    if (personIndex !== -1) {
      setValue(`talent.${personIndex}.signature`, signature, { shouldDirty: true });
    } else {
      console.error(`Person with name ${person.name} not found in talent array.`);
      notify(`Couldn't save signature — "${person.name}" not found in the talent list.`);
    }
  };

  return { addSignature };
};
