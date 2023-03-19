import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { Box } from '@mui/system';
import {
  CircularProgress,
  Typography,
  Stack,
  FormHelperText,
} from '@mui/material';
import Header from '../headers/Header';
import Sidebar from '../common/sidebar';
import CustomInput, { StyledLabel } from '../common/input';
import DatePicker from '../common/datePicker';
import AddressInput from '../common/addresInput';

import CustomButton from '../common/button';
import {
  validateAddress,
  validateEmail,
  validatePhone,
  validateBirthday,
  validateField,
} from '../common/validation';
import { UserActionsEnum } from '../../store/actions/user';
import { useTypedSelector } from '../../hooks/hooks';
import './style.scss';

interface IPersonalData {
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
}

interface IContactData {
  email: string;
  phone_number: string;
  address: string;
}

interface IErrorsData {
  first_name: string | undefined;
  last_name: string | undefined;
  date_of_birth: string | undefined;
  email: string | undefined;
  phone_number: string | undefined;
  address: string | undefined;
}

const initialErrors: IErrorsData = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  email: '',
  phone_number: '',
  address: '',
};

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useTypedSelector((state) => state.auth.user);
  const {
    errors: {
      first_name,
      last_name,
      date_of_birth,
      email,
      phone_number,
      address,
    },
  } = useTypedSelector((state) => state.profile);

  const inintialPersonalData: IPersonalData = {
    first_name: currentUser!.first_name!,
    last_name: currentUser!.last_name!,
    date_of_birth: currentUser!.date_of_birth!,
  };

  const initialContactData: IContactData = {
    email: currentUser!.email!,
    phone_number: currentUser!.phone_number!,
    address: currentUser!.address!,
  };

  const [personalData, setPersonalData] =
    React.useState<IPersonalData>(inintialPersonalData);
  const [contactData, setContactData] =
    React.useState<IContactData>(initialContactData);
  const [isPersonalChanged, setIsPersonalChanged] = React.useState(false);
  const [isContactChanged, setIsContactChanged] = React.useState(false);
  const [errors, setErrors] = React.useState(initialErrors);

  const validateInputs = (): boolean => {
    const firstNameErr = validateField(personalData.first_name);
    const lastNameErr = validateField(personalData.last_name);
    const birthdayErr = validateBirthday(personalData.date_of_birth);
    const emailErr = validateEmail(contactData.email);
    const addressErr = validateAddress(contactData.address);
    const phoneErr = validatePhone(contactData.phone_number);
    if (
      firstNameErr ||
      lastNameErr ||
      birthdayErr ||
      emailErr ||
      phoneErr ||
      addressErr
    ) {
      setErrors({
        first_name: firstNameErr,
        last_name: lastNameErr,
        date_of_birth: birthdayErr,
        email: emailErr,
        phone_number: phoneErr,
        address: addressErr,
      });
    }
    return [
      firstNameErr,
      lastNameErr,
      birthdayErr,
      emailErr,
      phoneErr,
      addressErr,
    ].every((el) => !el);
  };

  const handlePersonalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
    setIsPersonalChanged(true);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
    setIsContactChanged(true);
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDatepickerChange = (date: string | null): void => {
    setPersonalData({ ...personalData, date_of_birth: date });
    setErrors({ ...errors, date_of_birth: '' });
    setIsPersonalChanged(true);
  };

  const handleSelected = (address: string | undefined): void => {
    setContactData({ ...contactData, address: address as string });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (validateInputs()) {
      if (e.currentTarget.id === 'personal') {
        dispatch({ type: UserActionsEnum.UPDATE_DATA, data: personalData });
        setIsPersonalChanged(false);
      } else if (e.currentTarget.id === 'contact') {
        dispatch({ type: UserActionsEnum.UPDATE_DATA, data: contactData });
        setIsContactChanged(false);
      }
    }
  };

  React.useEffect(() => {
    setErrors({
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      address,
      email,
    });
  }, [first_name, last_name, date_of_birth, phone_number, address, email]);

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
              <Box className='form' id='personal'>
                <Typography variant='h2'>Personal information</Typography>
                <CustomInput
                  id='first_name'
                  name='first_name'
                  labelText='First name'
                  onChange={handlePersonalInputChange}
                  value={personalData.first_name}
                  className='form__input'
                  error={errors.first_name}
                />
                <CustomInput
                  id='last_name'
                  name='last_name'
                  labelText='Last name'
                  onChange={handlePersonalInputChange}
                  value={personalData.last_name}
                  className='form__input'
                  error={errors.last_name}
                />
                <DatePicker
                  value={personalData.date_of_birth}
                  onChange={handleDatepickerChange}
                  className='form__input'
                  error={errors.date_of_birth}
                />
                <CustomInput
                  id='ssn'
                  name='ssn'
                  labelText='SSN'
                  onChange={handlePersonalInputChange}
                  value={currentUser.SSN!}
                  className='form__input'
                  error={errors.last_name}
                  disabled
                />
                <CustomButton
                  id='personal'
                  children='Save changes'
                  onClick={handleSubmit}
                  variant='contained'
                  disabled={!isPersonalChanged}
                  className='form__btn'
                />
              </Box>

              <Box className='form' id='contacts-form'>
                <Typography variant='h2'>Contact information</Typography>
                <CustomInput
                  id='email'
                  name='email'
                  labelText='Email'
                  onChange={handleContactInputChange}
                  value={contactData.email}
                  className='form__input'
                  error={errors.email}
                />
                <StyledLabel htmlFor='phone'>Mobile phone number</StyledLabel>
                <InputMask
                  id='phone'
                  name='phone_number'
                  placeholder='(000) 000-0000'
                  mask='(999) 999-9999'
                  value={contactData.phone_number}
                  className='masked-input form__input'
                  onChange={handleContactInputChange}
                />
                <FormHelperText>{errors.phone_number}</FormHelperText>
                <AddressInput
                  value={contactData.address}
                  onChange={handleContactInputChange}
                  error={errors!.address!}
                  handleSelected={handleSelected}
                  className='form__input address-input'
                />
                <CustomButton
                  id='contact'
                  children='Save changes'
                  onClick={handleSubmit}
                  variant='contained'
                  disabled={!isContactChanged}
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

export default ProfilePage;
