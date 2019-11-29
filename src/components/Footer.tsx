import React from 'react';
import CoffeeButton from './CoffeeButton';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__footer'>
      <a
        href='https://www.henryfellerhoff.com'
        target='_blank noopener noreferrer'
        className='ipa__landing-page__footer-logo-container'
      >
        <img
          alt='Logo'
          src={require('../assets/henryfellerhofflogo.png')}
          className='ipa__landing-page__footer-logo'
        />
        <h3 className='ipa__landing-page__footer-name'>
          Built by Henry Fellerhoff
        </h3>
      </a>
      <div className='ipa__landing-page__footer-coffee-container'>
        <CoffeeButton />
      </div>
    </div>
  );
};

export default Footer;
