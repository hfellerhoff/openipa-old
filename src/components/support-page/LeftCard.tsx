import React from 'react';
import SupportCard from './SupportCard';
import redditlogo from '../../assets/reddit-white.png';
import githublogo from '../../assets/github-white.png';
interface Props {}

const LeftCard: React.FC<Props> = () => {
  return (
    <SupportCard
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
  );
};

export default LeftCard;
