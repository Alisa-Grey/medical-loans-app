import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

import { Box, FormHelperText, Typography } from '@mui/material';

import CustomButton from '../common/button';
import { validateSsn } from '../common/validation';

import { SsnActionsEnum } from '../../store/actions/ssn';
import './style.scss';

interface IErrorsData {
  ssn: string;
}

const initialErrors: IErrorsData = {
  ssn: '',
};

const SSNPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ssn, setSsn] = useState('');
  const [error, setError] = useState<IErrorsData>(initialErrors);
  const [className, setClassName] = useState('masked-input');

  const validateInputs = (): boolean => {
    const ssnErr = validateSsn(ssn);
    if (ssnErr) {
      setError({ ssn: ssnErr });
      setClassName('masked-input--error');
    }
    return [ssnErr].every((el) => !el);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSsn(e.target.value);
  };

  const handleSubmit = (): void => {
    if (validateInputs()) {
      dispatch({
        type: SsnActionsEnum.ADD_SSN,
        payload: ssn,
        actionHistory: navigate,
      });
    }
  };

  return (
    <>
      <Box className='ssn'>
        <Typography variant='h2' className='ssn__heading'>
          We need a little more information
        </Typography>
        <Box className='ssn__top-container'>
          <Typography variant='body1' className='ssn__text'>
            Please enter your SSN so we can be sure it's you
          </Typography>
        </Box>

        <InputMask
          id='ssn'
          name='ssn'
          placeholder='000-00-000'
          mask='999-99-9999'
          value={ssn}
          className={className}
          onChange={handleChange}
        ></InputMask>
        <FormHelperText sx={{ mb: '10px' }}>{error.ssn}</FormHelperText>

        <Typography variant='caption2' className='ssn__legal-text'>
          Your SSN is used to make sure we identify your credit history and not
          someone else&rsquo;s.{' '}
        </Typography>
        <Typography variant='caption2' className='ssn__legal-text'>
          Your personal information is secured with banking level security
        </Typography>

        <CustomButton variant='contained' type='submit' onClick={handleSubmit}>
          Submit
        </CustomButton>
        <Typography variant='body2' className='comment'>
          This application will not affect your credit score.
        </Typography>
      </Box>
    </>
  );
};

export default SSNPage;
