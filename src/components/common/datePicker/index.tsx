import React from 'react';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledLabel } from '../input';
import { theme } from '../../../theme';

interface IProps {
  onChange: (value: string | null) => void;
  value: string | null;
  className?: string;
  error?: string;
}

const DatePicker: React.FC<IProps> = (props) => {
  const handleChange = (newValue: Date | null): void => {
    props.onChange(newValue && newValue.toISOString());
  };

  const CustomTextField = styled(TextField)({
    backgroundColor: '#fff',
    '&.form__input': {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#595A94',
        },
      },
    },
    '& legend': {
      display: 'none',
    },
    '& fieldset': {
      top: 0,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#B9BAD5',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#595A94',
      },
      '&.Mui-error fieldset': {
        borderColor: '#FB6E07',
      },
    },
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledLabel htmlFor='DoB'>Date of birth</StyledLabel>
        <MobileDatePicker
          inputFormat='MM/dd/yyyy'
          value={props.value}
          onChange={handleChange}
          className={props.className}
          disableFuture
          renderInput={(params: TextFieldProps): JSX.Element => (
            <CustomTextField
              {...params}
              id='DoB'
              placeholder='MM/DD/YYYY'
              error={!!props.error}
              className={props.className}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText>{props.error}</FormHelperText>
    </>
  );
};

export default DatePicker;
