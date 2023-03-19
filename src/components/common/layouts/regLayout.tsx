import React from 'react';
import RegHeader from '../../headers/RegHeader';
import './style.scss';

interface ILayout {
  children: React.ReactElement;
}

const RegLayout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className='reg-layout'>
      <RegHeader></RegHeader>
      {children}
    </div>
  );
};

export default RegLayout;
