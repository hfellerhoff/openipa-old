import React from 'react';
import './CoffeeButton.scss';
import ReactGA from 'react-ga';

interface Props {}

const CoffeeButton: React.FC<Props> = () => {
  return (
    <ReactGA.OutboundLink
      className='bmc-button'
      eventLabel='BuyMeACoffee'
      target='_blank'
      to='https://www.buymeacoffee.com/henryfellerhoff'
    >
      <img
        src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
        alt='Buy me a coffee'
      />
      <span style={{ marginLeft: 10, fontSize: 19 }}>Buy me a coffee</span>
    </ReactGA.OutboundLink>
  );
};

export default CoffeeButton;
