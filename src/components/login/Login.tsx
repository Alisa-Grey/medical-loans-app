import React, { FC, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import CustomInput from '../common/input';
import PasswordInput from '../common/passwordInput';
import CustomButton from '../common/button';
import CustomLink from '../common/link';

import { AuthActionsEnum } from '../../store/actions/auth';
import { validateEmail, validatePassword } from '../common/validation';
import './login.scss';

interface IFormData {
  email: string;
  password: string;
}

const initialFormData: IFormData = { email: '', password: '' };
const initialFormDataErrors: IFormData = { email: '', password: '' };

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<IFormData>(initialFormData);
  const [errors, setErrors] = React.useState<IFormData>(initialFormDataErrors);
  const serverErrors = useSelector(
    (state: RootStateOrAny) => state.auth.errors
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateInputs = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password, formData.email);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    }
    return [emailError, passwordError].every((el) => !el);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch({
        type: AuthActionsEnum.SIGN_IN_REQUEST,
        userData: formData,
        actionHistory: navigate,
      });
    }
  };

  useEffect(() => {
    setErrors(serverErrors);
  }, [serverErrors]);

  return (
    <Box className='form-container'>
      <Typography variant='h2' sx={{ alignSelf: 'center' }}>
        Login
      </Typography>
      <form className='login-form' onSubmit={handleSubmit}>
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
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          labelText='Password'
          placeholderText='••••••••'
        />

        <CustomLink to='/reset-password' className='basic-link lonely-link'>
          Forgot Password?
        </CustomLink>
        <CustomButton variant='contained' type='submit'>
          Login
        </CustomButton>
      </form>
      <Typography
        sx={{ textAlign: 'center', fontSize: '15px', color: '#595A94' }}
      >
        Do not have have an account?&ensp;
        <CustomLink to='/register'>Register</CustomLink>
      </Typography>
    </Box>
  );
};

export default Login;
