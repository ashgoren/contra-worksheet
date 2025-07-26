import { useCallback } from 'react';
import { useConfirm } from 'material-ui-confirm';
import { useLocalStorage } from 'hooks/useLocalStorage';
import type { UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues, FieldValues, ArrayPath, FieldArray, Path } from 'react-hook-form';

interface UseFieldArrayManagerProps<TFieldValues extends FieldValues, TFieldName extends ArrayPath<TFieldValues>> {
  // TFieldValues is inferred as WorksheetFormData from the context where it's used
  // TFieldName is inferred as 'memberships' or similar from the context where it's used
  fieldName: TFieldName; // e.g. fieldName (the value) 'memberships' of the type 'memberships'
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues, TFieldName>; // this becomes, for example, UseFieldArrayAppend<WorksheetFormData, 'memberships'>
  getValues: UseFormGetValues<TFieldValues>; // TFieldValues is inferred as WorksheetFormData from the context where it's used
  shouldConfirmRemoval: (field: FieldArray<TFieldValues, TFieldName>) => boolean; // Optional function to determine if confirmation is needed
}

export const useFieldArrayManager = <TFieldValues extends FieldValues, TFieldName extends ArrayPath<TFieldValues>>(
  { fieldName, append, remove, getValues, shouldConfirmRemoval }: UseFieldArrayManagerProps<TFieldValues, TFieldName>) => {

  const confirm = useConfirm();
  const { saveToLocalStorage } = useLocalStorage();

  const addLine = useCallback((defaultValues: FieldArray<TFieldValues, TFieldName>) => {
    console.log('Adding line with default values:', defaultValues);
    append(defaultValues);
    saveToLocalStorage();
  }, [append, saveToLocalStorage]);

  const removeLine = useCallback(async (index: number) => {
    const fieldArray = getValues(fieldName as Path<TFieldValues>);
    const field = fieldArray[index];
    console.log('Removing line:', field);
    if (shouldConfirmRemoval(field)) {
      const { confirmed } = await confirm({
        title: 'Remove line',
        description: 'Are you sure you want to remove this line?',
      });
      if (!confirmed) return;
    }
    remove(index);
    saveToLocalStorage();
  }, [fieldName, confirm, getValues, remove, saveToLocalStorage, shouldConfirmRemoval]);

  return { addLine, removeLine };
};
