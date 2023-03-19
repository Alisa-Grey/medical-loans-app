import React, { FC, useState } from 'react';

import { Box, Typography } from '@mui/material';

import CustomButton from '../common/button';
import CustomDropzone from '../common/dropzone/dropzone';

import { ReactComponent as Icon } from '../../img/file.svg';
import { IFormData } from './Registration';

interface IProps {
  formData: IFormData;
  onChange: (name: string, value: string | boolean | File | null) => void;
  setStep: (page: number) => void;
}

const Step3: FC<IProps> = ({ onChange, setStep, formData }) => {
  const [file, setFile] = useState(formData.medical_bill);

  const handleBack = (): void => {
    setStep(1);
    setFile(file);
  };

  const handeleNext = (): void => {
    onChange('medical_bill', file);
    setStep(3);
  };

  const handleClear = (): void => {
    setFile(null);
  };

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>
        Step 3. Upload medical bill
      </Typography>
      {!file ? (
        <>
          <CustomDropzone setFile={setFile} />
          <CustomButton
            children='Back'
            onClick={handleBack}
            variant='outlined'
            className='container-btn'
          />
        </>
      ) : (
        <>
          <Box className='file-container'>
            <Icon />
            <Box className='file-descr'>
              <Typography variant='body1'>{file['name']}</Typography>
              <Typography variant='subtitle1'>
                {Math.ceil((file['size'] / (1024 * 1024)) * 100) / 100 + ' mb'}
              </Typography>
            </Box>
          </Box>

          <Box className='btn-container'>
            <CustomButton
              children='Clear'
              variant='outlined'
              onClick={handleClear}
              className='container-btn'
            />
            <CustomButton
              children='Next step'
              variant='contained'
              onClick={handeleNext}
              className='container-btn'
            />
          </Box>
          <CustomButton
            children='Back'
            onClick={handleBack}
            variant='outlined'
            className='container-btn'
          />
        </>
      )}
    </>
  );
};

export default Step3;
