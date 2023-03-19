import React, { FC } from 'react';
import { CircularProgress, Stack, Box, Typography } from '@mui/material';
import Header from '../headers/Header';
import Sidebar from '../common/sidebar';
import Loan from '../common/loan/Loan';
import './style.scss';
import { useTypedSelector } from '../../hooks/hooks';
import { ILoan } from '../../store/types';

const HistoryPage: FC = () => {
  const currentUser = useTypedSelector((state) => state.auth.user);
  const loans = currentUser!.loans.filter(
    (loan) =>
      loan.status === 'FULLYPAYED' ||
      loan.status === 'CHARGEDOFF' ||
      loan.status === 'FORGIVEN'
  );

  return (
    <>
      {currentUser ? (
        <>
          <Header data={currentUser} />
          <Stack
            className='page-with-menu'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ md: '30px', lg: '50px' }}
          >
            <Stack
              className='menu-container'
              direction={{ xs: 'column-reverse', sm: 'column' }}
            >
              <Box className='headings-container'>
                <Typography variant='h2' sx={{ mb: '15px' }}>
                  {currentUser.first_name} {currentUser.last_name}
                </Typography>
                <Typography className='page-with-menu__subheding'>
                  Personal profile
                </Typography>
              </Box>
              <Sidebar />
            </Stack>

            <Stack
              direction='column'
              spacing='32px'
              className='forms-container'
            >
              {loans.map((loan: ILoan) => (
                <Loan
                  data={loan}
                  key={loan.id}
                  loanComment='Loan closed:'
                  className='loan'
                />
              ))}
            </Stack>
          </Stack>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default HistoryPage;
