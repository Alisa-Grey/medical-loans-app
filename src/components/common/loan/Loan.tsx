import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LoanTerms from '../LoanTerms';
import StatusBadge from '../StatusBadge';
import PaymentsCalendar from '../paymentsCalendar';
import { formatDate, formatMoney } from '../helperFunctions';
import './style.scss';
import { ILoan } from '../../../store/types';

export interface ILoanInterface {
  data: ILoan;
  loanComment?: string;
  className?: string;
  onClick?: () => void;
}

const classNames = {
  NEW: 'progress',
  CURRENT: 'success',
};

const headings = {
  NEW: 'Review in progress...',
  CURRENT: 'Congrats! Loan is verified',
};

const content = {
  NEW: 'We are processing your request. It make take few minutes. We will notify you when ready',
  CURRENT: 'Your bill we be payed soon. Estimated payment date: March 2, 2022',
  FULLYPAYED: '',
};

const Loan: FC<ILoanInterface> = ({
  data,
  loanComment,
  onClick,
  className,
}) => {
  return (
    <Box className={className} sx={{ mb: '20px' }} onClick={onClick}>
      <Box sx={{ flexBasis: '60%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '20px 23px',
            borderBottom: '1px solid #F3F4FA',
          }}
        >
          <Typography variant='h1' component='h2'>
            {formatMoney(Number(data.amount))}
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            className='loan__status'
          >
            <StatusBadge
              status={data.status as string}
              className='badge'
            ></StatusBadge>
            <Typography>{formatDate(String(data.createdAt), 'DDD')}</Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ px: '23px', pt: '30px' }}
          className='loan__details-container'
        >
          {data.isProofPaymentVerified ? (
            <Box sx={{ pb: '20px' }}>
              <Typography variant='body2' sx={{ mb: '20px', fontWeight: 700 }}>
                Bill is payed -{' '}
                <a href={String(data.proofPayment)} className='basic-link'>
                  Download confirmation
                </a>
                . {loanComment}
              </Typography>
              <PaymentsCalendar />
            </Box>
          ) : (
            <>
              <Box
                className={`img-container ${
                  classNames[data.status as keyof typeof classNames]
                }`}
              ></Box>
              <Box className='loan__details'>
                <Typography variant='h2'>
                  {headings[data.status as keyof typeof headings]}
                </Typography>
                <Typography variant='body1'>
                  {content[data.status as keyof typeof content]}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Box>
      <Box sx={{ p: '60px 20px 20px', borderLeft: '1px solid #F3F4FA' }}>
        <LoanTerms data={data} />
      </Box>
    </Box>
  );
};

export default Loan;
