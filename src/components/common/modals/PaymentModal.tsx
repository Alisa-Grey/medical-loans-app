import React, { useState } from 'react';
import { Modal, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomInput from '../input';
import CustomButton from '../button';
import { validateField } from '../validation';
import './style.scss';

interface IModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
};

const PaymentModal: React.FC<IModalProps> = ({ isOpened, onClose }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [error, setError] = useState('');

  const validateInput = (): boolean => {
    const amountError = validateField(paymentAmount);
    if (amountError) {
      setError(amountError);
    }
    if (Number(paymentAmount) < 0) {
      setError('Payment can not be less then 0');
    }
    return [amountError].every((el) => !el);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPaymentAmount(e.target.value);
  };

  const handleCancel = (): void => {
    setPaymentAmount('');
  };

  const handleConfirm = (): void => {
    if (validateInput()) {
      // TODO send payment amount
      onClose();
    }
  };

  return (
    <Modal
      open={isOpened}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
    >
      <Box className='form-container' sx={{ ...style }}>
        <IconButton onClick={onClose} className='close-btn'>
          <CloseIcon />
        </IconButton>
        <Typography
          variant='h2'
          sx={{ textAlign: 'center' }}
          id='modal-modal-title'
        >
          Extra payments
        </Typography>
        <Box className='img-wrapper'></Box>
        <CustomInput
          id='amount'
          name='amount'
          value={paymentAmount}
          labelText='Payment amount'
          placeholderText='$0.00'
          onChange={handleInputChange}
          error={error}
          type='number'
        />
        <Box sx={{ alignSelf: 'center' }}>
          <CustomButton
            children='Cancel'
            variant='outlined'
            className='container-btn'
            onClick={handleCancel}
          />
          <CustomButton
            children='Confirm payment'
            variant='contained'
            className='container-btn'
            onClick={handleConfirm}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
