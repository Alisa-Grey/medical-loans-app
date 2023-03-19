import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

interface IProps extends CheckboxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  name: string;
}

const BpIcon = styled('span')(() => ({
  width: 24,
  height: 24,
  border: '1px solid #B9BAD5',
  borderRadius: '4px',
  backgroundColor: '#fff',
  'input:hover ~ &': {
    borderColor: '#82E3BA',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
  '&.Mui-checked': {
    borderColor: '#595A94',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#fff',
  '&:before': {
    display: 'inline-block',
    width: 24,
    height: 24,
    padding: 0,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='14' height='12' viewBox='0 0 14 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.9954 1.07644C13.2292 1.28101 13.2529 1.63638 13.0483 1.87017L5.17332 10.8702C5.07081 10.9873 4.92432 11.0568 4.76872 11.062C4.61312 11.0671 4.46234 11.0076 4.35225 10.8975L0.977252 7.52251C0.757583 7.30284 0.757583 6.94669 0.977252 6.72702C1.19692 6.50735 1.55308 6.50735 1.77275 6.72702L4.7226 9.67687L12.2017 1.12935C12.4062 0.895559 12.7616 0.871868 12.9954 1.07644Z' fill='%232FBB80'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    borderColor: '#82E3BA',
  },
});

function BpCheckbox(props: CheckboxProps): JSX.Element {
  return (
    <Checkbox
      disableRipple
      color='default'
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox' }}
      {...props}
    />
  );
}

const CustomCheckbox: FC<IProps> = ({ onChange }): JSX.Element => {
  return <BpCheckbox onChange={onChange} />;
};

export default CustomCheckbox;
