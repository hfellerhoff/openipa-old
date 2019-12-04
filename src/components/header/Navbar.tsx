import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import './Navbar.scss';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const [navbarRef, setNavbarRef] = useState(document.createElement('div'));

  window.onscroll = () => {
    if (window.pageYOffset > 0) {
      navbarRef.className = 'ipa__navbar ipa__navbar--scrolled';
    } else {
      navbarRef.className = 'ipa__navbar';
    }
  };

  return (
    <div
      className='ipa__navbar'
      ref={div => setNavbarRef(div ? div : navbarRef)}
    >
      <Link className='ipa__navbar__logo-container' to='/'>
        <img src={logo} alt='Open IPA' className='ipa__navbar__logo' />
        <h5 className='ipa__navbar__title'>Open IPA</h5>
      </Link>
      <div className='ipa__navbar__link-container'>
        <Link
          className='ipa__navbar__link ipa__navbar__link--featured'
          to='/support'
        >
          Support
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
