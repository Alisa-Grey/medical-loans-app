import React, { useEffect } from 'react';
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
} from '@mui/material';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import CustomCheckbox from './common/checkbox';
import './registration/style.scss';
import CustomButton from './common/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PaymentMethodActionsEnum } from '../store/actions/paymentMethod';

const ChoosePaymentMethod: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isUsingDwolla, setisUsingDwolla] = React.useState(false);
  const [checkedCount, setCheckedCount] = React.useState(0);

  const handleSelectElectronic = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    setisUsingDwolla(e.target.checked);
  };
  const handleSelectCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    setIsDisabled(!e.target.checked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    if (e.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };

  useEffect(() => {
    if (checkedCount === 3) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [checkedCount]);

  const handleClick = (): void => {
    dispatch({
      type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD,
      payload: isUsingDwolla,
      actionHistory: navigate,
    });
  };

  return (
    <Stack className='form-container'>
      <FormControlLabel
        control={
          <CustomCheckbox name='electronic' onChange={handleSelectElectronic} />
        }
        label={
          <Typography variant='h2' sx={{ mb: 0 }}>
            Electronic Payment
          </Typography>
        }
      />
      <List sx={{ pl: '20px' }}>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: '25px' }}>
            <Brightness1RoundedIcon sx={{ height: '10px' }} />
          </ListItemIcon>
          <ListItemText primary='Routing Number' />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: '25px' }}>
            <Brightness1RoundedIcon sx={{ height: '10px' }} />
          </ListItemIcon>
          <ListItemText primary='Account Number' />
        </ListItem>
      </List>
      <FormControlLabel
        control={<CustomCheckbox name='check' onChange={handleSelectCheck} />}
        label={
          <Typography variant='h2' sx={{ mb: 0 }}>
            Pay by check
          </Typography>
        }
      />
      <List sx={{ pl: '20px', mb: '20px' }}>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: '25px' }}>
            <Brightness1RoundedIcon sx={{ height: '10px' }} />
          </ListItemIcon>
          <ListItemText primary='Our mailing address: 28 Liberty St, New York, NY 10005' />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: '25px' }}>
            <Brightness1RoundedIcon sx={{ height: '10px' }} />
          </ListItemIcon>
          <ListItemText primary='Please note there is $5 monthly processing fee for non electronic payments' />
        </ListItem>
      </List>

      <Stack
        direction='column'
        visibility={isUsingDwolla ? 'visible' : 'hidden'}
      >
        <FormControlLabel
          className='labelled-checkbox'
          control={
            <CustomCheckbox name='dwolla-terms' onChange={handleChange} />
          }
          label={
            <Typography>
              I accept{' '}
              <a
                href='https://www.dwolla.com/legal/tos/#legal-content'
                className='basic-link'
              >
                Dwolla terms of use
              </a>
            </Typography>
          }
        />
        <FormControlLabel
          className='labelled-checkbox'
          control={<CustomCheckbox name='agreement' onChange={handleChange} />}
          label={
            <Typography>
              I accept{' '}
              <a href='#1' className='agreement'>
                Centaur Health terms of use for Dwolla
              </a>
            </Typography>
          }
        />
        <FormControlLabel
          className='labelled-checkbox'
          sx={{ mb: '20px' }}
          control={<CustomCheckbox name='agreement' onChange={handleChange} />}
          label={
            <Typography>
              If my loan is approved, I hereby provide my express consent to
              originate fund transfers from my account on the dates, for an
              amount up to and including the estimated payment amount provided
              on my TILA disclosure
            </Typography>
          }
        />
      </Stack>
      <CustomButton
        variant='contained'
        disabled={isDisabled}
        onClick={handleClick}
      >
        Continue
      </CustomButton>
    </Stack>
  );
};

export default ChoosePaymentMethod;
