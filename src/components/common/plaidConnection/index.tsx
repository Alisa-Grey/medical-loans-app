import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import { FormControlLabel, Stack, Typography } from '@mui/material';
import CustomButton from '../button';
import { PlaidTokenActionsEnum } from '../../../store/actions/plaidToken';
import { AlertActionsEnum } from '../../../store/actions/alert';
import { useTypedSelector } from '../../../hooks/hooks';
import './style.scss';
import CustomCheckbox from '../checkbox';

const PlaidIntegration: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkToken = useTypedSelector((state) => state.plaid.linkToken);

  React.useEffect(() => {
    dispatch({ type: PlaidTokenActionsEnum.GENERATE_TOKEN });
  }, [dispatch]);

  const onSuccess = React.useCallback(
    (public_token, metadata) => {
      const { account_id } = metadata;
      dispatch({
        type: PlaidTokenActionsEnum.EXCHANGE_TOKEN,
        payload: { public_token, account_id },
        actionHistory: navigate,
      });
      dispatch({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: 'Please wait for a response from Plaid',
          severity: 'success',
        },
      });
    },
    [dispatch, navigate]
  );

  const onExit = React.useCallback(
    (error) => {
      dispatch({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: error, severity: 'error' },
      });
    },
    [dispatch]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    env: process.env.REACT_APP_PLAID_ENV,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    setIsChecked(e.target.checked);
  };

  return (
    <Stack className='form-container plaid-container'>
      <Typography variant='h2'>Instantly connect your institution</Typography>

      <Stack direction='column' marginBottom={'20px'}>
        <Typography variant='caption2' className='ssn__legal-text'>
          Share your full financial picture to help us better assess your
          application
        </Typography>
        <Typography variant='caption2' className='ssn__legal-text'>
          Get a secure connection with read-only access
        </Typography>
        <Typography variant='caption2' className='ssn__legal-text'>
          Centaur Health will never store your credentials
        </Typography>
      </Stack>

      <FormControlLabel
        control={<CustomCheckbox name='plaid-check' onChange={handleCheck} />}
        label={
          <Typography>
            I understand that will be redirected to Plaid to complete my
            application. I confirm i have access to Plaid’s{' '}
            <a href='https://plaid.com/legal/#consumers' className='basic-link'>
              End-User Privacy Policy
            </a>
          </Typography>
        }
        sx={{
          alignItems: 'flex-start',
          pl: '10px',
          mb: '20px',
        }}
      />

      <Typography variant='body1' color='#B9BAD4' mb={'20px'}>
        When instantly connecting with Plaid, Centaur Health does not store your
        login information and will never share your synced data. Linking to a
        financial institution creates a secure, read-only connection with your
        firm through our data partner,{' '}
        <a href='https://plaid.com/en-eu/' className='basic-link'>
          Plaid
        </a>
      </Typography>
      <CustomButton
        variant='contained'
        className='plaid-container__btn'
        onClick={(): void => open()}
        disabled={!ready}
      >
        Connect
      </CustomButton>
    </Stack>
  );
};

export default PlaidIntegration;
