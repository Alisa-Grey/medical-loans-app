import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as Icon } from '../../../img/shield.svg';
import './style.scss';

const SecureText: FC = () => {
  return (
    <Box className='secure-text'>
      <Icon className='secure-text__icon' />
      <Typography variant='caption2' sx={{ fontWeight: 600 }}>
        Your personal information is&nbsp;secured with banking level security
      </Typography>
    </Box>
  );
};

export default SecureText;
