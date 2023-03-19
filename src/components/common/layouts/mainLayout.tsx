import React from 'react';
import { Box } from '@mui/material';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <Box className='main-layout'>{children}</Box>;
};

export default Layout;
