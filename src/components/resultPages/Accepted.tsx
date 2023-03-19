import React, { FC, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CustomButton from '../common/button';
import { formatMoney } from '../common/helperFunctions';
import LoanAgreement from '../loanAgreement';
import './style.scss';

const AcceptPage: FC = () => {
  const [agreementOpened, setAgreementOpened] = useState(false);
  const loan = { amount: '50000', interest: '4281', term: '12' };

  const total = Number(loan.amount) + Number(loan.interest);
  const APR = ((Number(loan.interest) / Number(loan.amount)) * 100).toFixed(2);

  const openAgreement = (): void => {
    setAgreementOpened(true);
  };

  const closeAgreement = (): void => {
    setAgreementOpened(false);
  };

  return (
    <>
      <Box className='container result-container'>
        <Box className='icon-container accept'></Box>
        <Typography variant='h2' sx={{ mb: 2 }} className='text'>
          Congrats!
        </Typography>
        <Typography variant='body1' className='text descr'>
          You qualify for a loan:
        </Typography>
        <Stack direction='column' alignItems='center' className='loan-details'>
          <Typography variant='h2' sx={{ textAlign: 'center' }}>
            Proposed by Centaur Health Inc.
          </Typography>
          <Stack direction={'row'} spacing={{ xs: '25px', sm: '50px' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: '25px', sm: '50px' }}
            >
              <Box>
                <Typography className='loan-details__heading'>APR:</Typography>
                <Typography variant='h2' className='loan-details__value'>
                  {APR}%
                </Typography>
              </Box>
              <Box>
                <Typography className='loan-details__heading'>
                  Finance Charge:
                </Typography>
                <Typography variant='h2' className='loan-details__value'>
                  {formatMoney(Number(loan.interest))}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: '25px', sm: '50px' }}
            >
              <Box>
                <Typography className='loan-details__heading'>
                  Amount Financed:
                </Typography>
                <Typography variant='h2' className='loan-details__value'>
                  {formatMoney(Number(loan.amount))}
                </Typography>
              </Box>
              <Box>
                <Typography className='loan-details__heading'>
                  Total of Payments:
                </Typography>
                <Typography variant='h2' className='loan-details__value'>
                  {formatMoney(total)}
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Box>
            <Typography className='loan-details__heading'>
              Total number of payments:{' '}
              <span className='loan-details__value--highlighted'>
                {loan.term}
              </span>
            </Typography>
            <Typography className='loan-details__heading'>
              Amount per payment:{' '}
              <span className='loan-details__value--highlighted'>
                ${(total / Number(loan.term) / 100).toFixed(2)}
              </span>
            </Typography>
            <Typography className='loan-details__heading'>
              Your first payment is due one month after the issuance of the loan
              and then monthly.
            </Typography>
          </Box>
        </Stack>

        <CustomButton
          variant='contained'
          type='button'
          className='btn'
          onClick={openAgreement}
        >
          GET FURTHER INFORMATION ON THIS LOAN
        </CustomButton>
      </Box>
      <LoanAgreement isOpened={agreementOpened} onClose={closeAgreement} />
    </>
  );
};

export default AcceptPage;
