import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PasswordInput from '../common/passwordInput';
import CustomButton from '../common/button';
import { compareValues, validatePassword } from '../common/validation';
import { useDispatch } from 'react-redux';
import { ResetPasswordActionsEnum } from '../../store/actions/resetPassword';
import { useTypedSelector } from '../../hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';

interface IFormData {
  password: string;
  repeat_password: string;
}

interface IErrorsData {
  password?: string;
  repeat_password?: string;
}

const initialFormData: IFormData = {
  password: '',
  repeat_password: '',
};

const initialErrorsData: IErrorsData = {
  password: '',
  repeat_password: '',
};

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrorsData);
  let params = useParams<{ resetLink?: string }>();
  const linkIsValide = useTypedSelector(
    (state) => state.resetPassword.linkIsValid
  );

  const serverError = useTypedSelector((state) => state.resetPassword.errors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateInputs = (): boolean => {
    const email = localStorage.getItem('emailTemp');
    const passwordError = validatePassword(formData.password, email!);
    const repeatError = compareValues(
      formData.password,
      formData.repeat_password
    );
    if (passwordError || repeatError) {
      setErrors({
        ...errors,
        password: passwordError,
        repeat_password: repeatError,
      });
    }
    return [passwordError, repeatError].every((el) => !el);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (validateInputs()) {
      dispatch({
        type: ResetPasswordActionsEnum.RESET_PASSWORD,
        payload: formData,
        token: params.resetLink,
        email: localStorage.getItem('emailTemp'),
        actionHistory: navigate,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: ResetPasswordActionsEnum.CHECK_LINK,
      token: params.resetLink,
      email: localStorage.getItem('emailTemp'),
    });
  }, [dispatch, params.resetLink]);

  useEffect(() => {
    setErrors(serverError!);
  }, [serverError]);

  return (
    <Box className='form-container'>
      {linkIsValide && localStorage.getItem('emailTemp') ? (
        <>
          <Typography variant='h2' className='form-container__heading'>
            Create new password
          </Typography>
          <Typography variant='body1' className='form-container__text'>
            Your new password must be different from previous used password
          </Typography>
          <PasswordInput
            id='password'
            name='password'
            labelText='Password'
            placeholderText='••••••••'
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <PasswordInput
            id='repeat_password'
            name='repeat_password'
            labelText='Confirm Password'
            placeholderText='••••••••'
            value={formData.repeat_password}
            onChange={handleInputChange}
            error={errors.repeat_password}
          />
          <CustomButton variant='contained' onClick={handleSubmit}>
            Reset password
          </CustomButton>
        </>
      ) : (
        <>
          <Typography className='form-container__text' sx={{ fontWeight: 600 }}>
            Sorry, this link is invalid or expired
          </Typography>
          <CustomButton variant='contained' href='/reset-password'>
            Send new link
          </CustomButton>
        </>
      )}
    </Box>
  );
};

export default ResetPassword;
