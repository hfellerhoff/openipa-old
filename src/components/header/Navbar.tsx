import React, { useState, useEffect, useCallback } from 'react';
import logo from '../../assets/logo.png';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  location: string;
}

const Navbar: React.FC<Props> = ({ location }) => {
  const [navbarRef, setNavbarRef] = useState(document.createElement('div'));

  const checkForScroll = useCallback(() => {
    if (window.pageYOffset > 0) {
      navbarRef.className = 'ipa__navbar ipa__navbar--scrolled';
    } else {
      navbarRef.className = 'ipa__navbar';
    }
  }, [navbarRef.className]);

  window.onscroll = checkForScroll;
  useEffect(() => checkForScroll(), [checkForScroll, location]);

  return (
    <div
      className='ipa__navbar'
      ref={(div) => setNavbarRef(div ? div : navbarRef)}
    >
      <NavLink className='ipa__navbar__logo-container' to='/'>
        <img src={logo} alt='Open IPA' className='ipa__navbar__logo' />
        <h5 className='ipa__navbar__title'>Open IPA</h5>
      </NavLink>
      <div className='ipa__navbar__link-container'>
        <NavLink
          className='ipa__navbar__link ipa__navbar__link--featured'
          to='/support'
        >
          Support
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
