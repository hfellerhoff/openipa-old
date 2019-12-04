import React from 'react';
import SupportCard from './SupportCard';
import CoffeeButton from '../buttons/CoffeeButton';
import questionmark from '../../assets/question-mark-white.png';

interface Props {}

const RightCard: React.FC<Props> = () => {
  return (
    <SupportCard
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
        className='ipa__support__card-link ipa__support__card-link--mystery'
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
  );
};

export default RightCard;
