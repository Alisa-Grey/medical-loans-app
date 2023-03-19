import React from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './style.scss';

interface IModalProps {
  isOpened: boolean;
  onClose: () => void;
  documentLink: string;
  documentType: string;
}

const DocPreviewModal: React.FC<IModalProps> = ({
  isOpened,
  onClose,
  documentLink,
  documentType,
}) => {
  return (
    <Modal open={isOpened} aria-labelledby='modal-modal-title'>
      <Box className='modal'>
        <Box className='modal__header'>
          <Typography id='modal-modal-title' variant='h2' sx={{ mb: 0 }}>
            {documentType}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className='doc-preview'>
          {documentLink.endsWith('.pdf') ? (
            <iframe
              src={`https://docs.google.com/viewerng/viewer?url=${documentLink}&embedded=true`}
              frameBorder='0'
              height='100%'
              width='100%'
              title={documentType}
            ></iframe>
          ) : (
            <img
              src={documentLink}
              alt={documentType}
              className='doc-preview__img'
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DocPreviewModal;
