import { Paper, IconButton, Stack, Grid, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SectionHeader } from 'ui';
import { RHFTextField, RHFAdornedField, RHFSelect } from 'inputs';
import { useFieldArrayManager } from 'hooks/useFieldArrayManager';
import type { WorksheetFormData } from 'src/types/worksheet';

const PAYMENT_METHOD_OPTIONS = [
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'electronic', label: 'Electronic' },
];

export const MembershipSection = () => {
  const { control, getValues } = useFormContext<WorksheetFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'memberships',
  });

  const { addLine, removeLine } = useFieldArrayManager({
    fieldName: 'memberships',
    append,
    remove,
    getValues,
    shouldConfirmRemoval: (field) => !!field.name || !!field.amount
  });

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Memberships' />
      <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
        {fields.map((field, index) => (
          <Grid container spacing={2} key={field.id}>
            <Grid size={{ xs: 12, sm: 5 }}>
              <RHFTextField name={`memberships.${index}.name`} label='Name' fullWidth />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <RHFAdornedField name={`memberships.${index}.amount`} label='Amount' adornment='$' fullWidth />
            </Grid>
            <Grid size={{ xs: 5, sm: 3 }}>
              <RHFSelect name={`memberships.${index}.method`} label='How was this paid?' options={PAYMENT_METHOD_OPTIONS} fullWidth />
            </Grid>
            <Grid size={{ xs: 1, sm: 1 }}>
              <IconButton onClick={() => removeLine(index)} disabled={fields.length === 1}>
                <RemoveCircle />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Button
        variant='contained'
        size='small'
        color='primary'
        sx={{ mt: 2, display: 'flex-inline' }}
        onClick={() => addLine({ name: '', amount: '', method: 'cash' })}
      >
        <AddCircleOutlineIcon sx={{ mr: 1 }} />Add line
      </Button>
    </Paper>
  )
};
