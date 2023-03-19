import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ILinkProps extends LinkProps{
  children: React.ReactNode;
  to: string;
}

const CustomLink: React.FC<ILinkProps> = ({ children, to, ...props }) => {
  return (
    <>
      <Link
        className='basic-link'
        style={{
          fontWeight: 700,
          fontSize: '15px',
          lineHeight: '22px',
          textDecoration: 'none',
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
