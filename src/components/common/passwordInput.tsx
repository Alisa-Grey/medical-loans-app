import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { StyledInput, StyledLabel } from './input';

interface IPasswordInput {
  id: string;
  name?: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  className?: string;
  placeholderText: string;
}

interface PasswordState {
  showPassword: boolean;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  id,
  value,
  error,
  onChange,
  name,
  labelText,
  className,
  placeholderText,
}) => {
  const [visibility, setVisibility] = React.useState<PasswordState>({
    showPassword: false,
  });

  const handleClickShowPassword = (): void => {
    setVisibility({
      ...visibility,
      showPassword: !visibility.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  return (
    <>
      <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
      <StyledInput
        id={id}
        name={name}
        placeholder={placeholderText}
        type={visibility.showPassword ? 'text' : 'password'}
        value={value}
        error={!!error}
        onChange={onChange}
        className={className}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {visibility.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ marginBottom: 2 }}>{error}</FormHelperText>
    </>
  );
};

export default PasswordInput;
