import React from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertActionsEnum } from '../../store/actions/alert';
import { useTypedSelector } from '../../hooks/hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='outlined' {...props} />;
});

const CustomAlert: React.FC = () => {
  const dispatch = useDispatch();
  const alertState = useTypedSelector((state) => state.alert);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: AlertActionsEnum.HIDE_ALERT });
  };

  return (
    <>
      <Snackbar
        open={alertState.isOpened}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={alertState.severity}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
