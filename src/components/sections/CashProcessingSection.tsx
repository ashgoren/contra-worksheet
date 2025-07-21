import { Paper, IconButton, Stack, Grid, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SectionHeader, Subtitle } from 'ui';
import { RHFTextField, RHFAdornedField } from 'inputs';
import type { WorksheetFormData } from 'src/types/worksheet';

export const CashProcessingSection = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const { fields, append } = useFieldArray({
    control,
    name: 'pettyCash',
  });

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Starting Cash & Misc Expenses' />
      
      <RHFAdornedField name='startingCash' label='Starting Cash' adornment='$' fullWidth />

      <Box sx = {(theme) => ({ mt: 2, [theme.breakpoints.up('sm')]: { p: 3, border: '1px solid #ccc', borderRadius: 1 } }) }>
        <Subtitle title='Misc Expenses' />
        <Stack direction='column' spacing={2}>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={field.id}>
              <Grid size={7}>
                <RHFTextField name={`pettyCash.${index}.item`} label='Item' fullWidth />
              </Grid>
              <Grid size={4}>
                <RHFAdornedField name={`pettyCash.${index}.amount`} label='Amount' adornment='$' fullWidth />
              </Grid>
              {index === fields.length - 1 &&
                <Grid size={1}>
                  <IconButton onClick={() => append({ item: '', amount: null })}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          ))}
        </Stack>
      </Box>
    </Paper>
  )
};
