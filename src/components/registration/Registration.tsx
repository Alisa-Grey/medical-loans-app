import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import Stepper from '../common/stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import './style.scss';

const steps = [
  { label: '1. Personal information', step: 0 },
  { label: '2. Contact information', step: 1 },
  { label: '3. Upload medical bill', step: 2 },
  { label: '4. Final step', step: 3 },
];

export interface IFormData {
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone_number: string;
  address: string;
  email: string;
  password: string;
  repeat_password: string;
  allowNotifications: boolean;
  medical_bill: File | null;
  postal_code: string;
  state: string;
  city: string;
}

export const initialFormData: IFormData = {
  first_name: '',
  last_name: '',
  date_of_birth: null,
  phone_number: '',
  address: '',
  email: '',
  password: '',
  repeat_password: '',
  allowNotifications: false,
  medical_bill: null,
  postal_code: '',
  state: '',
  city: '',
};

const Registration: FC = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  useEffect(() => {
    return () => {
      setFormData(initialFormData);
      setStep(0);
    };
  }, [dispatch]);

  const onDataChange = (
    name: string,
    value: string | null | boolean | File
  ): void => {
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const renderCurrentStep = (): JSX.Element | undefined => {
    switch (step) {
      case 0:
        return (
          <Step1
            formData={formData}
            onChange={onDataChange}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <Step2
            formData={formData}
            onChange={onDataChange}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <Step3
            formData={formData}
            onChange={onDataChange}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Step4
            formData={formData}
            onChange={onDataChange}
            setStep={setStep}
          />
        );
      default:
        return (
          <Step1
            formData={formData}
            onChange={onDataChange}
            setStep={setStep}
          />
        );
    }
  };

  return (
    <>
      <Stepper activeStep={step} steps={steps.map((step) => step.label)} />
      <Box className='form-container'>{renderCurrentStep()}</Box>
    </>
  );
};

export default Registration;
