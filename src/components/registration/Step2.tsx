import React, { FC, useState } from 'react';

import {
  Typography,
  Box,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import InputMask from 'react-input-mask';

import CustomButton from '../common/button';
import SecureText from '../common/secureText';
import { StyledLabel } from '../common/input';
import CustomCheckbox from '../common/checkbox';
import { validateAddress, validatePhone } from '../common/validation';

import { IFormData } from './Registration';
import AddressInput from '../common/addresInput';

interface IProps {
  formData: IFormData;
  onChange: (name: string, value: string | boolean) => void;
  setStep: (page: number) => void;
}

interface IErrorsData {
  phone: string;
  address: string;
}

const initialErrors: IErrorsData = {
  phone: '',
  address: '',
};

interface IAddress {
  postal_code: string;
  state: string;
  city: string;
  address: string;
}

const Step2: FC<IProps> = ({ formData, onChange, setStep }) => {
  const [errors, setErrors] = useState<IErrorsData>(initialErrors);
  const [className, setClassName] = useState('masked-input');
  const [isAddressPicked, setIsAddressPicked] = useState(false);

  const handleSelected = (userAddress: IAddress): void => {
    setIsAddressPicked(true);

    Object.entries(userAddress).forEach((el) => {
      if (el[0] !== 'city') {
        onChange(el[0], el[1]);
      } else onChange('city', el[1] ? el[1] : 'New York');
    });
  };

  const validateInputs = (): boolean => {
    const phoneErr = validatePhone(formData.phone_number);
    const addressErr = validateAddress(formData.address);
    if (phoneErr || addressErr) {
      setErrors({
        phone: phoneErr,
        address: addressErr,
      });
    }
    if (phoneErr) {
      setClassName('masked-input--error');
    }
    if (!isAddressPicked) {
      setErrors({ phone: '', address: 'Please pick an address' });
    }
    return [phoneErr, addressErr].every((el) => !el);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.name, e.target.value);
    if (e.target.name === 'address') {
      setIsAddressPicked(false);
    }
    setErrors({ ...errors, [e.target.name]: '' });
    setClassName('masked-input');
  };

  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    onChange('allowNotifications', e.target.checked);
  };

  const handleNext = (): void => {
    if (validateInputs()) {
      setStep(2);
    }
  };

  const handleBack = (): void => {
    setStep(0);
  };

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Step 2. Contact information
      </Typography>

      <StyledLabel htmlFor='phone'>Mobile phone number</StyledLabel>
      <InputMask
        id='phone'
        name='phone_number'
        placeholder='(000) 000-0000'
        mask='(999) 999-9999'
        value={formData.phone_number}
        className={className}
        onChange={handleInputChange}
      />
      <FormHelperText>{errors.phone}</FormHelperText>

      <FormControlLabel
        className='labelled-checkbox'
        control={
          <CustomCheckbox
            onChange={handleCheckChange}
            name='allow_notifications'
          />
        }
        label={
          <Typography variant='body1'>
            I&nbsp;authorize Centaur Health to&nbsp;send&nbsp;me notifications
            regarding my&nbsp;account via text message. Message &amp;&nbsp;data
            rates may apply.
          </Typography>
        }
      />

      <AddressInput
        value={formData.address}
        onChange={handleInputChange}
        error={errors.address}
        handleSelected={handleSelected}
      />

      <SecureText></SecureText>

      <Box className='btn-container'>
        <CustomButton
          children='Back'
          onClick={handleBack}
          variant='outlined'
          className='container-btn'
        />
        <CustomButton
          children='Next step'
          onClick={handleNext}
          variant='contained'
          className='container-btn'
        />
      </Box>

      <Typography className='comment'>
        This application will not affect your credit score.
      </Typography>
    </>
  );
};

export default Step2;
