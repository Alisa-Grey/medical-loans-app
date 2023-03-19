import React, { FC, useState } from 'react';

import { FormControlLabel, Typography } from '@mui/material';

import CustomInput from '../common/input';
import DatePicker from '../common/datePicker';
import CustomButton from '../common/button';
import SecureText from '../common/secureText';
import { IFormData } from './Registration';

import { validateBirthday, validateField } from '../common/validation';
import CustomCheckbox from '../common/checkbox';
interface IProps {
  formData: IFormData;
  onChange: (name: string, value: string | null) => void;
  setStep: (step: number) => void;
}
interface IErrorsData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const initialErrors: IErrorsData = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
};

const Step1: FC<IProps> = ({ formData, onChange, setStep }) => {
  const [errors, setErrors] = useState<IErrorsData>(initialErrors);

  const validateInputs = (): boolean => {
    const firstNameErr = validateField(formData.first_name);
    const lastNameErr = validateField(formData.last_name);
    const birthdayErr = validateBirthday(formData.date_of_birth);
    if (firstNameErr || lastNameErr || birthdayErr) {
      setErrors({
        first_name: firstNameErr,
        last_name: lastNameErr,
        date_of_birth: birthdayErr,
      });
    }
    return [firstNameErr, lastNameErr, birthdayErr].every((el) => !el);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.name, e.target.value);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDatepickerChange = (date: string | null): void => {
    onChange('date_of_birth', date);
    setErrors({ ...errors, date_of_birth: '' });
  };

  const handleNext = (): void => {
    if (validateInputs()) {
      setStep(1);
    }
  };

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Step 1. Personal information
      </Typography>
      <CustomInput
        id='first_name'
        name='first_name'
        placeholderText='John'
        onChange={handleInputChange}
        value={formData.first_name}
        labelText='First name'
        error={errors.first_name}
      />
      <CustomInput
        id='last_name'
        name='last_name'
        placeholderText='Doe'
        onChange={handleInputChange}
        value={formData.last_name}
        labelText='Last name'
        error={errors.last_name}
      />
      <DatePicker
        value={formData.date_of_birth}
        onChange={handleDatepickerChange}
        error={errors.date_of_birth}
      />

      <Typography variant='caption2' sx={{ mb: 2 }}>
        We are requesting your personal information to consider your application
        for a loan
      </Typography>

      <FormControlLabel
        className='labelled-checkbox'
        control={
          <CustomCheckbox
            onChange={handleInputChange}
            name='allow_esignature'
          />
        }
        label={
          <Typography variant='body2'>
            I permit to use of{' '}
            <a
              href='#1'
              className='basic-link'
              target='_blank'
              rel='noreferrer'
            >
              electronic signature
            </a>
          </Typography>
        }
      />

      <FormControlLabel
        className='labelled-checkbox'
        control={
          <CustomCheckbox onChange={handleInputChange} name='accept_terms' />
        }
        label={
          <Typography variant='body2'>
            I understand the{' '}
            <a
              href='#1'
              className='basic-link'
              target='_blank'
              rel='noreferrer'
            >
              Financial Privacy Policy
            </a>
          </Typography>
        }
      />

      <FormControlLabel
        className='labelled-checkbox'
        control={
          <CustomCheckbox
            onChange={handleInputChange}
            name='allow_credit_report'
          />
        }
        label={
          <Typography variant='body2'>
            I understand that I may be redirected to Plaid to complete my
            application. I confirm I have access to Plaid&rsquo;s{' '}
            <a
              href='https://plaid.com/legal/#consumers'
              className='basic-link'
              target='_blank'
              rel='noreferrer'
            >
              End-User Privacy Policy
            </a>
          </Typography>
        }
      />

      <SecureText></SecureText>
      <CustomButton
        children='Next step'
        onClick={handleNext}
        variant='contained'
        type='button'
      ></CustomButton>
      <Typography className='comment'>
        This application will not affect your credit score.
      </Typography>
    </>
  );
};

export default Step1;
