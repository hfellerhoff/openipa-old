import React from 'react';
import './LandingPage.scss';
import Demonstration from '../components/Demonstration/Demonstration';
import LanguageSelectButton from '../components/LanguageSelectButton/LanguageSelectButton';
import { Languages } from '../constants/Interfaces';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

const LandingPage: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__container'>
      <div className='ipa__landing-page__hero'>
        <h1 className='ipa__landing-page__hero__title'>Open IPA</h1>
        <h3 className='ipa__landing-page__hero__subtitle'>
          Free, informative IPA transcription for Lyric Diction
        </h3>
        <h4 className='ipa__landing-page__hero__call-to-action'>
          Get started with:
        </h4>
        <div className='ipa__landing-page__hero__button-container'>
          <LanguageSelectButton language={Languages.Latin} status='active' />
          <LanguageSelectButton language={Languages.French} status='caution' />
          <LanguageSelectButton
            language={Languages.Italian}
            status='inactive'
          />
          <LanguageSelectButton language={Languages.German} status='inactive' />
        </div>
      </div>
      <div className='ipa__landing-page__description'>
        <div className='ipa__landing-page__description__overview-container'>
          <div className='ipa__landing-page__description__overview-content'>
            <h1 className='ipa__landing-page__description__overview-title'>
              Real-Time
            </h1>
            <p className='ipa__landing-page__description__overview-paragraph'>
              Contrary to other transcription tools, Open IPA transcribes text
              into IPA in real-time, providing instantaneous transcription in
              multiple languages to help you spend less time transcribing and
              more time singing.
            </p>
          </div>
          <div style={{ width: 40, height: 40 }}></div>
          <div className='ipa__landing-page__description__overview-content'>
            <h1 className='ipa__landing-page__description__overview-title'>
              Education-Focused
            </h1>
            <p className='ipa__landing-page__description__overview-paragraph'>
              Many transcription tools function as a bit of a "black box",
              spitting out IPA with seemingly no clear process. With Open IPA,
              transcriptions include not only the IPA but the thought process
              behind it, allowing you to better understand the transcriptions
              you use.
            </p>
          </div>
          <div style={{ width: 40, height: 40 }}></div>
          <div className='ipa__landing-page__description__overview-content'>
            <h1 className='ipa__landing-page__description__overview-title'>
              Community-Driven
            </h1>
            <p className='ipa__landing-page__description__overview-paragraph'>
              Open IPA thrives off of contribution and feedback from the
              community of people that use it. We welcome any and all input, and
              greatly encourage users to become involed and help improve Open
              IPA for the betterment of those who use it.
            </p>
          </div>
        </div>
      </div>
      <Demonstration />
    </div>
  );
};

export default LandingPage;
