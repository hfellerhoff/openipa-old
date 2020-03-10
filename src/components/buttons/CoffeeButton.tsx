import React from 'react';
import './CoffeeButton.scss';
import ReactGA from 'react-ga';

interface Props {}

const CoffeeButton: React.FC<Props> = () => {
  return (
    <ReactGA.OutboundLink
      className='bmc-button'
      eventLabel='Kofi'
      target='_blank'
      to='https://ko-fi.com/henryfellerhoff'
    >
      <img src={require('../../assets/kofi.png')} alt='Buy me a coffee' />
      <span style={{ marginLeft: 10, fontSize: 19 }}>Buy me a coffee</span>
    </ReactGA.OutboundLink>
  );
};

export default CoffeeButton;
