import { useFormContext, useFieldArray } from 'react-hook-form';
import { Paper, Typography, Grid, Button, IconButton, Stack, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { SectionHeader, Subtitle } from 'ui';
import { TravelAmountsPopover } from 'components/Popover';
import { RHFCheckbox, RHFTextField, RHFAdornedField, RHFSelect } from 'inputs';
import { useFieldArrayManager } from 'hooks/useFieldArrayManager';
import type { WorksheetFormData } from 'types/worksheet';

export const TalentSection = () => {
  const { control, getValues } = useFormContext<WorksheetFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'talent',
  });

  const { addLine, removeLine } = useFieldArrayManager({
    fieldName: 'talent',
    append,
    remove,
    getValues,
    shouldConfirmRemoval: (field) => !!field.name || !!field.travel
  });

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Talent' />
      <Typography variant='body2' sx={{ mb: 2 }}>
        <RHFCheckbox name='gearRental' label='Sound person used our gear?' />
      </Typography>

      <RHFAdornedField name='guarantee' label='Talent Guarantee' adornment='$' confirmOnChange={true} />

      <Box sx = {(theme) => ({ mt: 2, [theme.breakpoints.up('sm')]: { p: 3, border: '1px solid #ccc', borderRadius: 1 } }) }>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Subtitle title='Talent' />
          <TravelAmountsPopover />
        </Box>

        <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={field.id} sx = {(theme) => ({ mt: 2, [theme.breakpoints.down('sm')]: { p: 3, border: '1px solid #ccc', borderRadius: 1 } }) }>
              <Grid size={{ xs: 12, sm: 5 }}>
                <RHFTextField name={`talent.${index}.name`} label='Name' fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <RHFSelect
                  name={`talent.${index}.role`}
                  label='Role'
                  options={[
                    { value: 'musician', label: 'musician' },
                    { value: 'sound', label: 'sound' },
                    { value: 'caller', label: 'caller' }
                  ]}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <RHFAdornedField name={`talent.${index}.travel`} label='Travel' adornment='$' fullWidth />
              </Grid>
              <Grid size={1}>
                <IconButton onClick={() => removeLine(index)} disabled={fields.length === 1} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  <RemoveCircle />
                </IconButton>
                <Button variant='text' size='small' color='inherit' onClick={() => removeLine(index)} disabled={fields.length === 1} sx={{ mt: 1, display: { xs: 'inline-flex', sm: 'none' } }}>
                  <RemoveCircleOutlineIcon sx={{ mr: 1 }} />Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Stack>
        <Button
          variant='contained'
          size='small'
          color='primary'
          sx={{ mt: 2, display: 'flex-inline' }}
          onClick={() => addLine({ name: '', role: 'musician', travel: '' })}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />Add line
        </Button>
      </Box>
    </Paper>
  );
};
