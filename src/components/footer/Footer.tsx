import React from 'react';
import redditlogo from '../../assets/reddit-white.png';
import githublogo from '../../assets/github-white.png';
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
      <div className='ipa__footer-logo-links'>
        <div className='ipa__footer-logo-link-container ipa__footer-logo-link-container-github'>
          <a
            href='https://github.com/hfellerhoff/openipa'
            target='_blank noopener noreferrer'
            className='ipa__footer-logo-container'
          >
            <img
              alt='Logo'
              src={githublogo}
              className='ipa__footer-logo-link'
            />
          </a>
        </div>
        <div className='ipa__footer-logo-link-container ipa__footer-logo-link-container-reddit'>
          <a
            href='https://www.reddit.com/r/openipa/'
            target='_blank noopener noreferrer'
            className='ipa__footer-logo-container'
          >
            <img
              alt='Logo'
              src={redditlogo}
              className='ipa__footer-logo-link ipa__footer-logo-link-reddit'
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
