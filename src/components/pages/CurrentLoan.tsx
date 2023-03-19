import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Link,
  Typography,
  Stack,
} from '@mui/material';

import Header from '../headers/Header';
import LoanTerms from '../common/LoanTerms';
import StatusBadge from '../common/StatusBadge';
import PaymentsCalendar from '../common/paymentsCalendar';
import CustomButton from '../common/button';
import PaymentModal from '../common/modals/PaymentModal';
import DocPreviewModal from '../common/modals/DocPreviewModal';
import { formatMoney, formatDate } from '../common/helperFunctions';
import { LoanActionsEnum } from '../../store/actions/loan';
import { useTypedSelector } from '../../hooks/hooks';
import { theme } from '../../theme';
import './style.scss';

const payments = [
  { date: '2021-03-22T11:41:05.537Z', status: 'PAYED', late: 0 },
  { date: '2021-04-22T11:41:05.537Z', status: 'CURRENT', late: 0 },
  { date: '2021-05-22T11:41:05.537Z', status: 'UPCOMING', late: 0 },
  { date: '2021-06-22T11:41:05.537Z', status: 'UPCOMING', late: 0 },
];

const CurrentLoan: React.FC = () => {
  let params = useParams<{ id?: string }>();
  const dispatch = useDispatch();

  const currentUser = useTypedSelector((state) => state.auth.user);
  const loan = useTypedSelector((state) => state.loan.loan);

  const [isPaymentOpened, setIsPaymentOpened] = useState(false);
  const [isBillOpened, setIsBillOpened] = useState(false);
  const [isProofOpened, setIsProofOpened] = useState(false);

  const handlePaymentModalOpen = (): void => {
    setIsPaymentOpened(true);
  };

  const handlePaymentModalClose = (): void => {
    setIsPaymentOpened(false);
  };

  const handleBillModalOpen = (): void => {
    setIsBillOpened(true);
  };

  const handleBillModalClose = (): void => {
    setIsBillOpened(false);
  };

  const handleProofModalOpen = (): void => {
    setIsProofOpened(true);
  };

  const handleProofModalClose = (): void => {
    setIsProofOpened(false);
  };

  React.useEffect(() => {
    dispatch({ type: LoanActionsEnum.GET_LOAN, payload: params.id });
  }, [dispatch, params.id]);

  return (
    <>
      {currentUser && (
        <>
          <Header data={currentUser} />
          <Box className='wrapper'>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                [theme.breakpoints.down('sm')]: { px: 1 },
              }}
            >
              <Stack>
                <Breadcrumbs
                  aria-label='breadcrumb'
                  sx={{ alignSelf: 'flex-start', mb: 2 }}
                >
                  <Link underline='hover' href='/me/loans'>
                    <Typography variant='buttonMini' sx={{ color: '#0E117B' }}>
                      {' '}
                      my loans
                    </Typography>
                  </Link>
                  <Typography variant='buttonMini' color='#B9BAD4'>
                    current loan
                  </Typography>
                </Breadcrumbs>
                <Typography variant='h2'>Loan details</Typography>
              </Stack>
              <CustomButton
                variant='contained'
                className='payment-btn'
                onClick={handlePaymentModalOpen}
              >
                <Typography className='payment-btn__text payment-btn__text--normal'>
                  make extra payment
                </Typography>
                <Typography className='payment-btn__text payment-btn__text--mob'>
                  extra payment
                </Typography>
              </CustomButton>
            </Stack>

            {loan ? (
              <>
                <Box
                  className='loan'
                  sx={{ mb: 4, justifyContent: 'flex-start' }}
                >
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
                        {formatMoney(Number(loan.amount))}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center' }}
                        className='loan__status'
                      >
                        <StatusBadge
                          status={loan.status as string}
                          className='badge'
                        />
                        <Typography>
                          {formatDate(loan.createdAt as string, 'DDD')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        p: '20px 23px',
                        borderBottom: '1px solid #F3F4FA',
                      }}
                    >
                      <Typography
                        variant='body2'
                        sx={{ mb: 2, fontWeight: 700, width: '80%' }}
                      >
                        Loan progress:
                      </Typography>
                      <PaymentsCalendar />
                    </Box>

                    <Box className='payments-container'>
                      <Typography
                        sx={{
                          mb: '12px',
                          fontWeight: '700',
                          fontSize: '15px',
                          lineHeight: '22px',
                          color: '#B9BAD4',
                        }}
                      >
                        Payments history
                      </Typography>
                      <Stack direction='column' gap='22px'>
                        {payments.map((payment, index) => (
                          <Box className='payment' key={index}>
                            <Box
                              className={`pages-icon-container ${
                                payment.status !== 'PAYED'
                                  ? 'pending'
                                  : 'success'
                              }`}
                            ></Box>
                            <Box className='payment__info'>
                              <Typography
                                variant='h2'
                                className='payment__heading'
                              >
                                {formatDate(payment.date, 'LLL dd')} |{' '}
                                {formatDate(payment.date, 'HH:mm')}
                              </Typography>
                              <Typography
                                variant='caption2'
                                sx={{ color: '#B9BAD4' }}
                              >
                                Days late: {payment.late}
                              </Typography>
                            </Box>
                            <Typography variant='h2' sx={{ mb: 0, ml: 'auto' }}>
                              {formatMoney(7134)}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Box>

                  <Stack
                    direction='column'
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    sx={{
                      p: '30px',
                      borderLeft: '1px solid #F3F4FA',
                    }}
                  >
                    <LoanTerms data={loan} />
                    <Box sx={{ borderLeft: '1px solid #f3f4fa' }}></Box>
                    <Stack direction='row' gap={{ xs: '10px', sm: '30px' }}>
                      <Box className='doc-container'>
                        <img
                          src={require('../../img/medicalBill.png')}
                          alt='proof of payment'
                          className='doc-img'
                        />
                        <Stack
                          direction='column'
                          className='pages-btn-container'
                        >
                          <CustomButton
                            variant='outlined'
                            className='btn'
                            onClick={handleBillModalOpen}
                          >
                            Preview
                          </CustomButton>
                          <CustomButton
                            variant='outlined'
                            className='btn'
                            href={loan.medicalBill}
                          >
                            Get pdf
                          </CustomButton>
                        </Stack>
                      </Box>
                      <Box className='doc-container'>
                        <img
                          src={require('../../img/paymentProof.png')}
                          alt='proof of payment'
                          className='doc-img'
                        />
                        {loan.proofPayment && (
                          <Stack
                            direction='column'
                            className='pages-btn-container'
                          >
                            <CustomButton
                              variant='outlined'
                              children='preview'
                              className='btn'
                              onClick={handleProofModalOpen}
                            />
                            <CustomButton
                              variant='outlined'
                              children='get pdf'
                              className='btn'
                              href={loan.proofPayment}
                            />
                          </Stack>
                        )}
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <PaymentModal
                  isOpened={isPaymentOpened}
                  onClose={handlePaymentModalClose}
                />
                <DocPreviewModal
                  isOpened={isBillOpened}
                  onClose={handleBillModalClose}
                  documentType='Medical bill'
                  documentLink={loan.medicalBill}
                />
                <DocPreviewModal
                  isOpened={isProofOpened}
                  onClose={handleProofModalClose}
                  documentType='Proof of payment'
                  documentLink={loan.proofPayment}
                />
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default CurrentLoan;
