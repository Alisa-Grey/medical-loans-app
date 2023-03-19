import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        justifySelf: 'flex-end',
        mt: 'auto',
        py: '16px',
        textAlign: 'center',
        backgroundColor: '#FAFAFF',
      }}
    >
      <Typography variant='caption'>
        &copy;&nbsp;Centaur Health Inc.&nbsp;2021&nbsp;| All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
