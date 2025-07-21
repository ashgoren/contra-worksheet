import { useFormContext, Controller } from 'react-hook-form';
import { Box, Stack, Typography, TextField, type TextFieldProps } from '@mui/material';
import type { Path, FieldValues } from 'react-hook-form';

export interface RHFTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, 'name' | 'defaultValue'> {
    name: Path<TFieldValues>;
}

export const RHFTextField = <TFieldValues extends FieldValues>({ name, label, type = 'text', size = 'small', ...rest }: RHFTextFieldProps<TFieldValues>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type === 'number' ? 'text' : type}
          size={size}
          onChange={(e) => {
            const { value } = e.target;
            if (type === 'number') {
              const isUnsignedFloat = /^[0-9]*\.?[0-9]*$/.test(value);
              if (isUnsignedFloat) field.onChange(value);
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

interface RHFAdornedFieldProps<TFieldValues extends FieldValues>
  extends Omit<RHFTextFieldProps<TFieldValues>, 'type'> {
    adornment: string;
    adornmentWidth?: string | number;
}
export const RHFAdornedField = <TFieldValues extends FieldValues>({ name, label, adornment, adornmentWidth, ...rest }: RHFAdornedFieldProps<TFieldValues>) => {
  return (
    <Stack direction='row' alignItems='center'>
      <Box sx={{
        minWidth: adornmentWidth || 0,
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
        slotProps={{ htmlInput: { inputMode: 'decimal' } }}
        sx={{ '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
        {...rest}
      />
    </Stack>
  );
};
