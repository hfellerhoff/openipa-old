import React from 'react';
import LanguageSelectionButtons from '../button-containers/LanguageSelectionButtons';
import './Hero.scss';

interface Props {}

const Hero: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__hero'>
      <h1 className='ipa__landing-page__hero__title'>Open IPA</h1>
      <h3 className='ipa__landing-page__hero__subtitle'>
        Free, informative IPA transcription for Lyric Diction
      </h3>
      <h4 className='ipa__landing-page__hero__call-to-action'>
        Get started with:
      </h4>
      <LanguageSelectionButtons />
    </div>
  );
};

export default Hero;
