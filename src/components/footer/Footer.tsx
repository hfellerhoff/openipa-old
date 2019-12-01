import React from 'react';
import CoffeeButton from '../buttons/CoffeeButton';
import henryfellerhoff from '../../assets/henryfellerhofflogo.png';
import './Footer.scss';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className='ipa__footer'>
      <a
        href='https://www.henryfellerhoff.com'
        target='_blank noopener noreferrer'
        className='ipa__footer-logo-container'
      >
        <img alt='Logo' src={henryfellerhoff} className='ipa__footer-logo' />
        <h3 className='ipa__footer-name'>Built by Henry Fellerhoff</h3>
      </a>
      <div className='ipa__footer-coffee-container'>
        <CoffeeButton />
      </div>
    </div>
  );
};

export default Footer;
