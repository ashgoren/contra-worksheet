import { Controller, type Control } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';
import type { WorksheetFormData } from 'src/types/worksheet';

type RHFTextFieldProps = Omit<TextFieldProps, 'name'> & {
  name: keyof WorksheetFormData;
  control: Control<WorksheetFormData>;
};

export const RHFTextField = ({ name, control, label, type = 'text', size = 'small', ...rest }: RHFTextFieldProps) => {
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
          {...rest}
        />
      )}
    />
  );
}
