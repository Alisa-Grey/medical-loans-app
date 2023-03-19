import React, { FC } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Header from '../headers/Header';
import Sidebar from '../common/sidebar';
import PasswordInput from '../common/passwordInput';

import CustomButton from '../common/button';
import { compareValues, validatePassword } from '../common/validation';
import { UserActionsEnum } from '../../store/actions/user';
import './style.scss';

interface IFormData {
  current_password: string;
  new_password: string;
  repeat_password: string;
}

const initialFormData = {
  current_password: '',
  new_password: '',
  repeat_password: '',
};

const SecurityPage: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootStateOrAny) => state.auth.user);
  const serverErrors = useSelector(
    (state: RootStateOrAny) => state.profile.errors
  );

  const [isChanged, setIsChanged] = React.useState(false);
  const [errors, setErrors] = React.useState<IFormData>(initialFormData);
  const [formData, setFormData] = React.useState<IFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsChanged(true);
    setErrors({ ...errors, [e.target.name]: '' });
    Object.values(formData).forEach((item) => {
      if (item.trim() === '') {
        setIsChanged(false);
      }
    });
  };

  const validateInputs = (): boolean => {
    const passwordError = validatePassword(
      formData.current_password,
      currentUser.email
    );
    const newPasswordError =
      formData.current_password === formData.new_password
        ? 'Please use new password'
        : '';
    const repeatError = compareValues(
      formData.new_password,
      formData.repeat_password
    );
    if (passwordError || !newPasswordError || repeatError) {
      setErrors({
        current_password: passwordError,
        new_password: newPasswordError,
        repeat_password: repeatError,
      });
    }
    return [passwordError, newPasswordError, repeatError].every((el) => !el);
  };

  const handleSubmit = (): void => {
    if (validateInputs()) {
      dispatch({
        type: UserActionsEnum.CHANGE_PASSWORD,
        payload: formData,
      });
      setIsChanged(false);
    }
  };

  React.useEffect(() => {
    setErrors(serverErrors);
  }, [serverErrors]);

  return (
    <>
      {currentUser ? (
        <>
          <Header data={currentUser} />
          <Stack
            className='page-with-menu'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ md: '30px', lg: '50px' }}
          >
            <Stack
              className='menu-container'
              direction={{ xs: 'column-reverse', sm: 'column' }}
            >
              <Box className='headings-container'>
                <Typography variant='h2' sx={{ mb: '15px' }}>
                  {currentUser.first_name} {currentUser.last_name}
                </Typography>
                <Typography className='page-with-menu__subheding'>
                  Personal profile
                </Typography>
              </Box>
              <Sidebar />
            </Stack>

            <Stack
              direction='column'
              spacing='32px'
              className='forms-container'
            >
              <Box className='form'>
                <Typography variant='h2'>Change password</Typography>
                <PasswordInput
                  id='current_password'
                  name='current_password'
                  placeholderText='Type password'
                  value={formData.current_password}
                  onChange={handleChange}
                  error={errors.current_password}
                  labelText='Current password'
                  className='form__input'
                />
                <PasswordInput
                  id='new_password'
                  name='new_password'
                  placeholderText='Type password'
                  value={formData.new_password}
                  onChange={handleChange}
                  error={errors.new_password}
                  labelText='New password'
                  className='form__input'
                />
                <PasswordInput
                  id='repeat_password'
                  name='repeat_password'
                  placeholderText='Type password'
                  value={formData.repeat_password}
                  onChange={handleChange}
                  error={errors.repeat_password}
                  labelText='Repeat new password'
                  className='form__input'
                />
                <CustomButton
                  id='personal'
                  children='Save changes'
                  onClick={handleSubmit}
                  variant='contained'
                  disabled={!isChanged}
                  className='form__btn'
                />
              </Box>
            </Stack>
          </Stack>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default SecurityPage;
