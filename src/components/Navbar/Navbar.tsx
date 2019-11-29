import React from 'react';
import logo from '../../assets/logo.png';
import './Navbar.scss';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__navbar'>
      <Link className='ipa__landing-page__navbar__logo-container' to='/'>
        <img
          src={logo}
          alt='Open IPA'
          className='ipa__landing-page__navbar__logo'
        />
        <h5 className='ipa__landing-page__navbar__title'>Open IPA</h5>
      </Link>
    </div>
  );
};

export default Navbar;
