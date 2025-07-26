import { Paper, IconButton, Stack, Grid, Box, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SectionHeader, Subtitle } from 'ui';
import { RHFTextField, RHFAdornedField } from 'inputs';
import { useFieldArrayManager } from 'hooks/useFieldArrayManager';
import type { WorksheetFormData } from 'src/types/worksheet';

export const CashProcessingSection = () => {
  const { control, getValues } = useFormContext<WorksheetFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pettyCash',
  });

  const { addLine, removeLine } = useFieldArrayManager({
    fieldName: 'pettyCash',
    append,
    remove,
    getValues,
    shouldConfirmRemoval: (field) => !!field.item || !!field.amount
  });

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Starting Cash & Misc Expenses' />
      
      <RHFAdornedField name='startingCash' label='Starting Cash' adornment='$' fullWidth />

      <Box sx = {(theme) => ({ mt: 2, [theme.breakpoints.up('sm')]: { p: 3, border: '1px solid #ccc', borderRadius: 1 } }) }>
        <Subtitle title='Misc Expenses' />
        <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={field.id}>
              <Grid size={7}>
                <RHFTextField name={`pettyCash.${index}.item`} label='Item' fullWidth />
              </Grid>
              <Grid size={4}>
                <RHFAdornedField name={`pettyCash.${index}.amount`} label='Amount' adornment='$' fullWidth />
              </Grid>
              <Grid size={1}>
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
          onClick={() => addLine({ item: '', amount: '' })}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />Add line
        </Button>

      </Box>
    </Paper>
  )
};
