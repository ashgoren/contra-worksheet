import { useFormContext, Controller } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';
import type { WorksheetFormData } from 'src/types/worksheet';

type RHFTextFieldProps = Omit<TextFieldProps, 'name'> & {
  name: keyof WorksheetFormData;
};

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
