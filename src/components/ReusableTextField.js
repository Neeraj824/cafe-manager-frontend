import React from 'react';
import { TextField } from '@mui/material';

const ReusableTextField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  fullWidth = true,
  type = 'text',
  error = false,
  helperText = '',
  inputProps = {},
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      type={type}
      error={error}
      helperText={helperText}
      inputProps={inputProps}
    />
  );
};

export default ReusableTextField;