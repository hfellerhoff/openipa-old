import React from 'react';
import LeftCard from './support-page/LeftCard';
import RightCard from './support-page/RightCard';
import './SupportPage.scss';

interface Props {}

const SupportPage: React.FC<Props> = () => {
  return (
    <div className='ipa__support__container fade-in'>
      <div className='ipa__support__hero-container'>
        <h1 className='ipa__support__hero-title'>Want to support Open IPA?</h1>
        <h3 className='ipa__support__hero-subtitle'>
          There are two ways to do it:
        </h3>
      </div>
      <div className='ipa__support__card-container'>
        <LeftCard />
        <RightCard />
      </div>
    </div>
  );
};

export default SupportPage;
