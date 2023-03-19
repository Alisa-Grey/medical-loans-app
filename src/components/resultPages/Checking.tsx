import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTypedSelector } from '../../hooks/hooks';
import './style.scss';

const Checking: FC = () => {
  const navigate = useNavigate();
  const approved = useTypedSelector((state) => state.ssn.approved);

  useEffect(() => {
    const checkStatus = (value: string): void => {
      value === 'true'
        ? navigate('/connect-plaid')
        : navigate('/checking-error');
    };
    const timer = setTimeout(() => {
      checkStatus(approved);
    }, 1200);
    return () => clearTimeout(timer);
  }, [approved, navigate]);

  return (
    <>
      <Box className='container result-container'>
        <Box className='icon-container checking'></Box>
        <Typography variant='h2' className='text' sx={{ mb: '20px' }}>
          We are checking your personal information...
        </Typography>
        <Typography variant='body2' sx={{ mb: '30px' }}>
          It may take a few minutes
        </Typography>
      </Box>
    </>
  );
};

export default Checking;
