import { Paper, IconButton, Stack, Grid, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SectionHeader } from 'ui';
import { RHFTextField, RHFAdornedField, RHFSelect } from 'inputs';
import { useFieldArrayManager } from 'hooks/useFieldArrayManager';
import type { WorksheetFormData } from 'src/types/worksheet';

const TIMING_OPTIONS = [
  { value: 'before', label: 'Before counting cash' },
  { value: 'after', label: 'After counting cash' },
];

export const MiscExpensesSection = () => {
  const { control, getValues } = useFormContext<WorksheetFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: 'pettyCash' });

  const { addLine, removeLine } = useFieldArrayManager({
    fieldName: 'pettyCash', append, remove, getValues,
    shouldConfirmRemoval: (field) => !!field.item || !!field.amount
  });

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Misc Expenses' />
      <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
        {fields.map((field, index) => (
          <Grid container spacing={2} key={field.id} alignItems='center'>
            <Grid size={{ xs: 12, sm: 5 }}><RHFTextField name={`pettyCash.${index}.item`} label='Item' fullWidth /></Grid>
            <Grid size={{ xs: 6, sm: 3 }}><RHFAdornedField name={`pettyCash.${index}.amount`} label='Amount' adornment='$' fullWidth /></Grid>
            <Grid size={{ xs: 5, sm: 3 }}>
              <RHFSelect name={`pettyCash.${index}.timing`} label='Paid when?' options={TIMING_OPTIONS} required fullWidth />
            </Grid>
            <Grid size={{ xs: 1, sm: 1 }}>
              <IconButton onClick={() => removeLine(index)} disabled={fields.length === 1}>
                <RemoveCircle />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Button variant='contained' size='small' color='primary' sx={{ mt: 2, display: 'flex-inline' }}
        onClick={() => addLine({ item: '', amount: '', timing: '' })}>
        <AddCircleOutlineIcon sx={{ mr: 1 }} />Add line
      </Button>
    </Paper>
  )
};
