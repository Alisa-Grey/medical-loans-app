import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Box } from '@mui/material';
import Loan from '../common/loan/Loan';
import Header from '../headers/Header';
import CustomButton from '../common/button';
import './style.scss';
import { useTypedSelector } from '../../hooks/hooks';

const LoansPage: FC = () => {
  const navigate = useNavigate();
  const currentUser = useTypedSelector((state) => state.auth.user);
  const loans = currentUser!.loans.filter(
    (loan) =>
      loan.status !== 'FULLYPAYED' &&
      loan.status !== 'CHARGEDOFF' &&
      loan.status !== 'FORGIVEN'
  );

  const handleLoanClick = (id: number): void => {
    navigate(`/loans/${id}`);
  };

  return (
    <>
      {currentUser ? (
        <>
          <Header data={currentUser} />
          <Box className='page'>
            <Typography variant='h2' sx={{ mb: '15px', textAlign: 'start' }}>
              My Loans
            </Typography>

            <Typography
              variant='subtitle'
              component='p'
              className='page__subheding'
            >
              {loans.length === 0 && `You have no loans`}
              {loans.length === 1
                ? `You have ${loans.length} current loan`
                : `You have ${loans.length} current loans`}
            </Typography>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <Loan
                  data={loan}
                  key={loan.id}
                  loanComment='Loan progress:'
                  onClick={(): void => handleLoanClick(loan.id)}
                  className='loan loan-clickable'
                />
              ))
            ) : (
              <Box className='no-loans'>
                <Box className='img-container no-loans__img'></Box>
                <Typography variant='h2'>You have no loans</Typography>
                <Typography
                  variant='subtitle'
                  component='p'
                  className='no-loans__text'
                >
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </Typography>
                <CustomButton variant='contained' className='no-loans__btn'>
                  Get new loan
                </CustomButton>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default LoansPage;
