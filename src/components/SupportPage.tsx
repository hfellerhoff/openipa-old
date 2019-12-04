import React, { useState } from 'react';
import './SupportPage.scss';
import SupportCard from './support-page/SupportCard';
import CoffeeButton from './buttons/CoffeeButton';
import redditlogo from '../assets/reddit-white.png';
import githublogo from '../assets/github-white.png';
import questionmark from '../assets/question-mark-white.png';

interface Props {}

const SupportPage: React.FC<Props> = () => {
  const [leftCardHeight, setLeftCardHeight] = useState(0);
  const [rightCardHeight, setRightCardHeight] = useState(0);
  return (
    <div className='ipa__support__container'>
      <div className='ipa__support__hero-container'>
        <h1 className='ipa__support__hero-title'>Want to support Open IPA?</h1>
        <h3 className='ipa__support__hero-subtitle'>
          There are two ways to do it:
        </h3>
      </div>
      <div className='ipa__support__card-container'>
        <SupportCard
          setHeight={setLeftCardHeight}
          otherHeight={rightCardHeight}
          position='left'
          title='With Your Time'
          description='Open IPA is community-driven. With the amount of work that goes into the project, 
          support from the community is crucial in making Open IPA the most accurate and
          helpful tool it can be. With each language offered having its own host of rules, exceptions,
          and edge cases, it requires more than just one person to keep afloat. If you would like to 
          follow the project or take part in development, please:'
        >
          <a
            className='ipa__support__card-link ipa__support__card-link--reddit'
            href='https://www.reddit.com/r/openipa/'
            target='_blank noopener noreferrer'
          >
            <img
              src={redditlogo}
              alt='Reddit'
              className='ipa__support-card__button-logo'
            />
            <span className='ipa__support__card-link-title'>
              Join the Community
            </span>
          </a>
          <a
            className='ipa__support__card-link ipa__support__card-link--github'
            href='https://github.com/hfellerhoff/openipa'
            target='_blank noopener noreferrer'
          >
            <img
              src={githublogo}
              alt='GitHub'
              className='ipa__support-card__button-logo'
            />
            <span className='ipa__support__card-link-title'>
              Contribute to Development
            </span>
          </a>
        </SupportCard>
        <SupportCard
          setHeight={setRightCardHeight}
          otherHeight={leftCardHeight}
          position='right'
          title='With Your Money'
          description='Creating, developing, and hosting a web application does not come without costs.
          In order to ensure that Open IPA thrives and that development can continue,
          please consider supporting the project financially. Your support goes a long
          way towards ensuring that Open IPA stays up, stays accurate, and continues
          to help transcribe into the future. If you would like to 
          contribute, please:'
        >
          <CoffeeButton />
          <div
            className='ipa__support__card-link ipa__support__card-link--stripe'
            // href='https://github.com/hfellerhoff/openipa'
            // target='_blank noopener noreferrer'
          >
            <img
              src={questionmark}
              alt='Question Mark'
              className='ipa__support-card__button-logo ipa__support-card__button-logo--question'
            />
            <span className='ipa__support__card-link-title'>Coming Soon!</span>
          </div>
        </SupportCard>
      </div>
    </div>
  );
};

export default SupportPage;
