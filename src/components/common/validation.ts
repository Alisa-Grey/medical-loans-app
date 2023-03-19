import validator from 'validator';

export const commonWords = [
  'password',
  'qwerty',
  '12345678',
  'jesus',
  'passw0rd',
  'sunshine',
  'princess',
  'letmein',
  'iloveyou',
  'baseball',
  'football',
];

export const validateEmail = (val: string): string => {
  if (val.trim() === '') return 'Email can not be empty';
  if (!validator.isEmail(val)) {
    return 'Email is not valid';
  }
  return '';
};

export const validatePassword = (val: string, username: string): string => {
  const PassRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (val.trim() === '') return 'Password can not be empty';
  if (!PassRegex.test(val.trim())) {
    return 'Min 8 characters, at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character';
  }
  if (commonWords.some((word) => val.toLowerCase().includes(word))) {
    return 'Can not be a common word';
  }
  if (val.includes(username)) {
    return 'Password can not include your email';
  }
  return '';
};

export const validateField = (val: string): string => {
  if (val.trim() === '') return 'Field can not be empty';
  if (val.length < 2) return 'Value should be at least 2 chars long';
  return '';
};

export const validateBirthday = (val: string | null): string => {
  if (!val) return 'Date of birth can not be empty';
  return '';
};

export const validatePhone = (val: string): string => {
  if (val.trim() === '') return 'Field can not be empty';
  if (!validator.isMobilePhone(val, 'en-US')) return 'Invalid field format';
  return '';
};

export const compareValues = (val1: string, val2: string): string => {
  if (val1 !== val2) return `Passwords didn't match`;
  return '';
};

export const validateAddress = (val: string): string => {
  if (val.trim() === '') return 'Field can not be empty';
  if (val.includes('CT') || val.includes('NY') || val.includes('NJ')) return '';
  return 'Address should be in NY, NJ or CT state';
};

export const validateSsn = (val: string): string => {
  const PassRegex =
    /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
  if (val.trim() === '') return 'Filed can not be empty';
  if (!PassRegex.test(val.trim())) {
    return 'Incorrect SSN format';
  }
  return '';
};
