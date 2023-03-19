import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import './style.scss';

const PaymentsCalendar: React.FC = () => {
  enum paymentStatusColors {
    PAYED = '#82E3BA',
    LATE = '#FB6E07',
    CURRENT = '#B9BAD4',
    UPCOMING = '#FAFAFF',
  }

  const payments = [
    { date: 'Jan 21', status: 'PAYED' },
    { date: 'Feb 21', status: 'PAYED' },
    { date: 'Mar 21', status: 'LATE' },
    { date: 'Apr 21', status: 'PAYED' },
    { date: 'May 21', status: 'PAYED' },
    { date: 'Jun 21', status: 'PAYED' },
    { date: 'Jul 21', status: 'PAYED' },
    { date: 'Aug 21', status: 'PAYED' },
    { date: 'Sep 21', status: 'PAYED' },
    { date: 'Oct 21', status: 'PAYED' },
    { date: 'Nov 21', status: 'PAYED' },
    { date: 'Dec 21', status: 'PAYED' },
  ];

  return (
    <Grid container spacing={0.5} columns={{ xs: 3, sm: 4, lg: 6 }}>
      {payments.map((payment: { [key: string]: string }, index: number) => (
        <Grid item xs={1} md={1} key={index} className='payments'>
          <Paper
            className='payments__item'
            sx={{
              backgroundColor: `${
                paymentStatusColors[
                  payment.status as keyof typeof paymentStatusColors
                ]
              }`,
            }}
          >
            <Typography
              variant='buttonMini'
              className={
                payment.status === 'LATE' || payment.status === 'CURRENT'
                  ? 'item-light'
                  : ''
              }
            >
              {payment.date}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PaymentsCalendar;
