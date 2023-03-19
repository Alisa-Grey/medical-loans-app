import React from 'react';
import { Box, IconButton, Modal, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../common/button';
import { useDispatch } from 'react-redux';
import { AgreementsActionsEnum } from '../../store/actions/agreements';
import { useTypedSelector } from '../../hooks/hooks';
import './style.scss';
import { useNavigate } from 'react-router-dom';
interface IModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const LoanAgreement: React.FC<IModalProps> = ({ isOpened, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documentLink = useTypedSelector((state) => state.tila.tilaUrl);

  // TODO solution for e-signatures not integrated yet, so for now it's just redirects to Loans page
  const handleSign = (): void => {
    navigate('/me/loans');
  };

  React.useEffect(() => {
    dispatch({ type: AgreementsActionsEnum.GET_TILA });
  }, [dispatch]);

  return (
    <Modal open={isOpened} aria-labelledby='modal-modal-title'>
      <Box className='modal'>
        <Box className='agreement__header'>
          <Typography
            id='modal-modal-title'
            variant='h2'
            sx={{ mb: 0 }}
            className='agreement__heading'
          >
            Loan Agreement
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className='doc-preview'>
          <iframe
            src={`${documentLink}#toolbar=0&navpanes=0`}
            title='tila'
            frameBorder='0'
            height='100%'
            width='100%'
            allowTransparency={true}
          ></iframe>
        </Box>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          className='agreement__wrap'
        >
          <Typography variant='body1' className='agreement__text'>
            By clicking on “SIGN AGREEMENT” I hereby certify that I have read
            and understand the loan&nbsp;agreement (which includes a limitation
            of liability and classaction waiver) and that this represents my
            electronic signature consenting to be boundby the terms of the loan
            agreement.
          </Typography>

          <Box className='agreement__btn-container'>
            <CustomButton
              variant='outlined'
              className='agreement__btn download-btn'
            >
              <a
                href={documentLink!}
                download='CentaurHealth_TILA'
                className='download-link'
              >
                Download agreement
              </a>
            </CustomButton>
            <CustomButton
              variant='contained'
              className='agreement__btn'
              onClick={handleSign}
            >
              Sign agreement
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LoanAgreement;
