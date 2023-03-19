import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { Box, Stack, Typography } from '@mui/material';
import { ILoanInterface } from './loan/Loan';
import { formatMoney } from './helperFunctions';
import { ILoan } from '../../store/types';

const LoanTerms: FC<ILoanInterface> = ({ data }) => {
  const nextDate = DateTime.fromISO(data.createdAt as string).plus({
    month: 1,
  });

  const total = Number(data.amount) + Number(data.interest);
  const totalLeft = total - Number(data.paymentReceived);

  const isLoanClosed = (loan: ILoan): boolean => {
    if (
      loan.status === 'FULLYPAYED' ||
      loan.status === 'CHARGEDOFF' ||
      loan.status === 'FORGIVEN'
    ) {
      return true;
    }
    return false;
  };

  return (
    <Stack
      direction={'row'}
      spacing={{ xs: '40px', sm: '80px' }}
      sx={{
        justifyContent: 'center',
        flexBasis: '50%',
      }}
    >
      <Stack direction={'column'} spacing={'30px'}>
        <Box>
          <Typography variant='body2'>Loan Amount:</Typography>
          <Typography variant='h2' sx={{ mb: '20px' }}>
            {formatMoney(total)}
          </Typography>
        </Box>
        {data.isProofPaymentVerified && !isLoanClosed(data) && (
          <Box>
            <Typography variant='body2'>Amount payed:</Typography>
            <Typography variant='h2' sx={{ mb: '20px' }}>
              {formatMoney(Number(data.paymentReceived))}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant='body2'>Next payment:</Typography>
          <Typography variant='h2'>
            {nextDate.toLocaleString(DateTime.DATE_MED)}
          </Typography>
        </Box>
      </Stack>
      <Stack direction={'column'} spacing={'30px'}>
        <Box>
          <Typography variant='body2'>Loan Term:</Typography>
          <Typography variant='h2' sx={{ mb: '20px' }}>
            {data.term} months
          </Typography>
        </Box>
        {data.isProofPaymentVerified && !isLoanClosed(data) && (
          <Box>
            <Typography variant='body2'>Current Loan:</Typography>
            <Typography variant='h2' sx={{ mb: '20px' }}>
              {formatMoney(totalLeft)}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant='body2'>Monthly payment:</Typography>
          <Typography variant='h2' sx={{ color: '#2FBB80 ' }}>
            {formatMoney(Math.ceil(total / 12))}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoanTerms;
