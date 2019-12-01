import React from 'react';
import './Description.scss';

interface Props {}

const Description: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__description'>
      <div className='ipa__landing-page__description__overview-container'>
        <div className='ipa__landing-page__description__overview-content'>
          <h1 className='ipa__landing-page__description__overview-title'>
            Real-Time
          </h1>
          <p className='ipa__landing-page__description__overview-paragraph'>
            Contrary to other transcription tools, Open IPA transcribes text
            into IPA in real-time, providing instantaneous transcription in
            multiple languages to help you spend less time transcribing and more
            time singing.
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
            behind it, allowing you to better understand the transcriptions you
            use.
          </p>
        </div>
        <div style={{ width: 40, height: 40 }}></div>
        <div className='ipa__landing-page__description__overview-content'>
          <h1 className='ipa__landing-page__description__overview-title'>
            Community-Driven
          </h1>
          <p className='ipa__landing-page__description__overview-paragraph'>
            Open IPA thrives off of contribution and feedback from the community
            of people that use it. We welcome any and all input, and greatly
            encourage users to become involed and help improve Open IPA for the
            betterment of those who use it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
