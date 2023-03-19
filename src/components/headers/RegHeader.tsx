import React, { FC } from 'react';
import './style.scss';

const RegHeader: FC = () => {
  return (
    <img
      src={require('../../img/Logo.png')}
      alt='Centaur Health logo'
      className='logo'
    />
  );
};

export default RegHeader;
