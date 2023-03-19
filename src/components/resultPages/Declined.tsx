import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import CustomButton from '../common/button';
import { Link } from 'react-router-dom';
import './style.scss';

const DeclinePage: FC = () => {
  return (
    <>
      <Box className='container result-container'>
        <Box className='icon-container decline'></Box>
        <Typography variant='h2' sx={{ mb: 2 }} className='text'>
          Unfortunately, we cannot serve you at this moment
        </Typography>
        <Typography variant='body1' className='text descr'>
          Thank you for applying for a loan from Centaur Health. Unfortunately,
          after carefully reviewing your application, we could not approve your
          loan request at this point in time: Please head to our financial
          education resources to find out ways to improve your credit score and
          your financial wellbeing.
        </Typography>
        <Link to='/' className='basic-link btn-link'>
          <CustomButton variant='contained' type='button' className='btn'>
            Visit our resouces page
          </CustomButton>
        </Link>
      </Box>
    </>
  );
};

export default DeclinePage;
