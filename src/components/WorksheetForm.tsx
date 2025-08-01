import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { WorksheetFormInputs } from './WorksheetFormInputs';
import { WorksheetFormCalculations } from './WorksheetFormCalculations';
import { FormButtons } from './FormButtons';
import type { WorksheetFormData } from 'types/worksheet';

export const WorksheetForm = () => {
  console.log('Rendering WorksheetForm');
  const { saveToLocalStorage } = useLocalStorage();
  const { handleSubmit } = useFormContext<WorksheetFormData>();
  const [page, setPage] = useState(1);

  const onSubmit = (data: WorksheetFormData) => {
    console.log('Submitted!', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onBlur={saveToLocalStorage}
    >
      {page === 1 && <WorksheetFormInputs />}
      {page === 2 && <WorksheetFormCalculations />}
      <FormButtons page={page} setPage={setPage} />
    </form>
  );
};
