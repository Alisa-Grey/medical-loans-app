import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import CustomInput from '../common/input';
import CustomButton from '../common/button';
import CustomLink from '../common/link';
import { validateEmail } from '../common/validation';
import './style.scss';
import { ResetPasswordActionsEnum } from '../../store/actions/resetPassword';
import { useTypedSelector } from '../../hooks/hooks';

const RequireNewPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const wasLinkSent = useTypedSelector(
    (state) => state.resetPassword.codeWasSent
  );

  const validateInput = (): boolean => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
    }
    return !emailError;
  };

  const handleinputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setBtnDisabled(false);
    setError('');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (validateInput()) {
      dispatch({
        type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD,
        payload: email,
      });
      setBtnDisabled(true);
    }
  };

  return (
    <Box className='form-container'>
      <Typography variant='h2' className='form-container__heading'>
        Reset password
      </Typography>
      <Typography variant='body1' className='form-container__text'>
        Please enter the adress associated with your&nbsp;account and we send an
        email with&nbsp;instructions to reset your password
      </Typography>
      <CustomInput
        id='email'
        name='email'
        labelText='Email'
        placeholderText='example@mail.com'
        value={email}
        error={error}
        onChange={handleinputChange}
      />

      <Typography
        variant='caption2'
        className={!wasLinkSent ? 'caption hidden' : 'caption'}
      >
        We've sent a reset password link to {email}. Please check your email
      </Typography>

      <CustomButton
        variant='contained'
        onClick={handleClick}
        className='form-container__btn'
        disabled={btnDisabled}
      >
        submit
      </CustomButton>
      <Typography variant='body1' sx={{ alignSelf: 'center' }}>
        Do you have an account? <CustomLink to='/login'>Login</CustomLink>
      </Typography>
    </Box>
  );
};

export default RequireNewPassword;
