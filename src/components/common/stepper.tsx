import React, { FC } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  StepperProps,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

interface IProps extends StepperProps {
  steps: string[];
  activeStep: number;
}

const StepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState, theme }) => ({
  width: 250,
  height: 5,
  borderRadius: '3px',
  backgroundColor: '#2FBB80',
  [theme.breakpoints.down('lg')]: {
    width: 140,
  },
  [theme.breakpoints.down('md')]: {
    width: 85,
    ...(ownerState.active && {
      backgroundColor: '#0E117B',
    }),
    ...(ownerState.completed && {
      backgroundColor: '#3437AD',
    }),
  },
  ...(ownerState.active && {
    backgroundColor: '#3437AD',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#595A94',
  }),
}));

const StepIcon = (props: StepIconProps): JSX.Element => {
  const { active, completed, className } = props;
  return (
    <StepIconRoot
      ownerState={{ completed, active }}
      className={className}
    ></StepIconRoot>
  );
};

const CustomStepper = styled(Stepper)(({ theme }) => ({
  justifyContent: 'center',
  alignContent: 'center',
  marginBottom: '40px',
  '@media (max-height: 900px)': {
    marginBottom: '20px',
  },
}));

const StyledStep = styled(Step)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '80px',
    paddingLeft: 0,
  },
}));

const StepperComponent: FC<IProps> = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CustomStepper activeStep={props.activeStep}>
      {props.steps.map((step) => (
        <StyledStep key={step}>
          {matches ? (
            <StepLabel StepIconComponent={StepIcon}></StepLabel>
          ) : (
            <StepLabel StepIconComponent={StepIcon}>{step}</StepLabel>
          )}
        </StyledStep>
      ))}
    </CustomStepper>
  );
};

export default StepperComponent;
