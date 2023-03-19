import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import CustomInput from '../common/input';
import PasswordInput from '../common/passwordInput';
import CustomButton from '../common/button';
import {
  validateEmail,
  validatePassword,
  compareValues,
} from '../common/validation';
import { IFormData } from './Registration';
import { RegActionsEnum } from '../../store/actions/register';
import { useTypedSelector } from '../../hooks/hooks';

interface IProps {
  formData: IFormData;
  onChange: (name: string, value: string) => void;
  setStep: (step: number) => void;
}

interface IErrorsData {
  email: string | undefined;
  password: string | undefined;
  repeat_password?: string | undefined;
}

const initialErrors: IErrorsData = {
  email: '',
  password: '',
  repeat_password: '',
};

const Step4: FC<IProps> = ({ formData, onChange, setStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<IErrorsData>(initialErrors);
  const {
    errors: { email, password },
  } = useTypedSelector((state) => state.auth);

  const validateInputs = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(
      formData.password,
      formData.email.split('@')[0]
    );
    const repeatError = compareValues(
      formData.password,
      formData.repeat_password
    );
    if (emailError || passwordError || repeatError) {
      setErrors({
        email: emailError,
        password: passwordError,
        repeat_password: repeatError,
      });
    }
    return [emailError, passwordError, repeatError].every((el) => !el);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.name, e.target.value);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleBack = (): void => {
    setStep(2);
  };

  const handleSubmit = (): void => {
    if (validateInputs()) {
      dispatch({
        type: RegActionsEnum.REGISTER_REQUEST,
        data: formData,
        actionHistory: navigate,
      });
    }
  };

  React.useEffect(() => {
    setErrors({ email, password });
  }, [email, password]);

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Step 4. Create account
      </Typography>

      <CustomInput
        id='email'
        name='email'
        placeholderText='example@mail.com'
        onChange={handleInputChange}
        value={formData.email}
        labelText='Email'
        error={errors.email}
      />
      <PasswordInput
        id='password'
        name='password'
        placeholderText='••••••••'
        value={formData.password}
        onChange={handleInputChange}
        labelText='Password'
        error={errors.password}
      />
      <PasswordInput
        id='repeat_password'
        name='repeat_password'
        placeholderText='••••••••'
        value={formData.repeat_password}
        onChange={handleInputChange}
        labelText='Repeat password'
        error={errors.repeat_password}
      />

      <Stack direction='column'>
        <CustomButton onClick={handleSubmit} variant='contained' type='submit'>
          APPLY FOR LOAN &amp; CREATE AN ACCOUNT
        </CustomButton>
        <CustomButton variant='outlined' onClick={handleBack}>
          Back
        </CustomButton>
      </Stack>

      <Typography variant='body2' sx={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to='/login' className='basic-link--bold'>
          Login
        </Link>
      </Typography>
    </>
  );
};

export default Step4;
