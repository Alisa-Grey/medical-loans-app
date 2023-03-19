import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

interface IBtnProps extends ButtonProps {
  id?: string;
  children?: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type?: 'submit' | 'button';
  variant: 'contained' | 'outlined';
  className?: string;
  disabled?: boolean;
  href?: string;
}

export const StyledButton = styled(Button)(() => ({
  marginBottom: 15,
}));

const CustomButton: React.FC<IBtnProps> = ({
  id,
  children,
  onClick,
  type = 'button',
  variant,
  className,
  disabled,
  href,
}) => {
  return (
    <Button
      id={id}
      onClick={onClick}
      type={type}
      variant={variant}
      sx={{ mb: '15px' }}
      className={className}
      disabled={disabled}
      href={href}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
