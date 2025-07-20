import { Paper, IconButton, Stack, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { SectionHeader } from 'ui';
import { RHFTextField, RHFAdornedField } from 'inputs';
import type { WorksheetFormData } from 'src/types/worksheet';

export const MembershipSection = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const { fields, append } = useFieldArray({
    control,
    name: 'memberships',
  });

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Memberships' />
      <Stack direction='column' spacing={2}>
        {fields.map((field, index) => (
          <Grid container spacing={2} key={field.id}>
            <Grid size={7}>
              <RHFTextField name={`memberships.${index}.name`} label='Name' fullWidth />
            </Grid>
            <Grid size={4}>
              <RHFAdornedField name={`memberships.${index}.amount`} label='Amount' adornment='$' fullWidth />
            </Grid>
            {index === fields.length - 1 &&
              <Grid size={1}>
                <IconButton onClick={() => append({ name: '', amount: null })}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            }
          </Grid>
        ))}
      </Stack>
    </Paper>
  )
};
