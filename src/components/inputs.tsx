import { useFormContext, Controller } from 'react-hook-form';
import { Box, Stack, Typography, TextField, type TextFieldProps } from '@mui/material';
import type { WorksheetFormData } from 'src/types/worksheet';

interface RHFTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: keyof WorksheetFormData;
}
export const RHFTextField = ({ name, label, type = 'text', size = 'small', ...rest }: RHFTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          size={size}
          onChange={(e) => {
            const value = e.target.value;
            if (type === 'number') {
              field.onChange(value === '' ? null : Number(value));
            } else {
              field.onChange(value);
            }
          }}
          value={field.value ?? ''}
          {...rest}
        />
      )}
    />
  );
}

interface RHFAdornedFieldProps extends Omit<RHFTextFieldProps, 'type'> {
  adornment: string;
}
export const RHFAdornedField = ({ name, label, adornment,...rest }: RHFAdornedFieldProps) => {
  return (
    <Stack direction='row' alignItems='center'>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '42px',
        px: 1.5,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRight: 'none',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: (theme) => theme.palette.action.hover,
      }}>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          {adornment}
        </Typography>
      </Box>

      <RHFTextField
        name={name}
        label={label}
        type='number'
        sx={{ '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
        {...rest}
      />
    </Stack>
  );
};
