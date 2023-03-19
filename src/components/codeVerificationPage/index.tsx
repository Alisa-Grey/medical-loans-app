import React from 'react';
import { useDispatch } from 'react-redux';
import { useTimer } from 'use-timer';
import { Box, Button, FormControlLabel, Typography } from '@mui/material';
import CustomButton from '../common/button';
import CustomInput from '../common/input';
import CustomCheckbox from '../common/checkbox';
import { useTypedSelector } from '../../hooks/hooks';
import { AuthActionsEnum } from '../../store/actions/auth';
import { AlertActionsEnum } from '../../store/actions/alert';
import './style.scss';

const CodeVerificationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { time, start, status } = useTimer({
    initialTime: 90,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  const [code, setCode] = React.useState('');
  const [sent, setSent] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState('');
  const verificationCodeErr = useTypedSelector((state) => state.auth.codeError);
  const hasSentCode = useTypedSelector((state) => state.auth.hasSentCode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setCode(e.target.value.trim());
    }
    setError('');
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    dispatch({
      type: AuthActionsEnum.VERIFY_CODE,
      payload: {
        code,
        accessToken: localStorage.getItem('access-token'),
      },
    });
  };

  const rememberMe = async (): Promise<void> => {
    const accessToken = localStorage.getItem('access-token');
    const email = localStorage.getItem('tempEmail');

    dispatch({
      type: AuthActionsEnum.REMEMBER_DEVICE,
      payload: { accessToken, email },
    });
  };

  const timer = `Wait for ${time} seconds`;

  const resendCode = async (): Promise<void> => {
    try {
      dispatch({
        type: AuthActionsEnum.SEND_CODE_ON_EMAIL,
        payload: {
          email: localStorage.getItem('tempEmail'),
          accessToken: localStorage.getItem('access-token'),
        },
      });
      start();
      setSent(true);
    } catch (err: any) {
      dispatch({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: err,
          severity: 'error',
        },
      });
    }
  };

  React.useEffect(() => {
    if (sent && status === 'STOPPED') {
      setSent(false);
    }
    setError(verificationCodeErr);
  }, [status, sent, verificationCodeErr]);

  return (
    <Box className='form-container'>
      <Typography variant='h2' sx={{ alignSelf: 'center' }}>
        Enter secure code to verify
      </Typography>
      <Typography
        variant='body1'
        sx={{
          alignSelf: 'center',
          maxWidth: '90%',
          mb: 3,
          textAlign: 'center',
        }}
      >
        Please enter your verification code for to verify your account
      </Typography>
      <form className='code-form' onSubmit={handleSubmit}>
        <CustomInput
          id='code'
          name='code'
          placeholderText='Type code'
          onChange={handleInputChange}
          value={code}
          labelText='Verification code'
          error={verificationCodeErr}
        />

        <Box sx={{ minWidth: '100px' }}>
          <Typography variant='body1'>{sent && timer}</Typography>
        </Box>

        <Button onClick={resendCode} disabled={sent} className='text-btn'>
          {hasSentCode ? 'Resend code' : 'Send code'}
        </Button>

        <FormControlLabel
          sx={{ m: 0, mb: 4 }}
          control={
            <CustomCheckbox
              name='rememberDevice'
              id='rememberDevice'
              onChange={rememberMe}
            />
          }
          label={<Typography variant='body1'>Remember device</Typography>}
        />

        <CustomButton variant='contained' type='submit'>
          Verify
        </CustomButton>
      </form>
    </Box>
  );
};

export default CodeVerificationPage;
