import React from 'react';
import './CoffeeButton.scss';

interface Props {}

const CoffeeButton: React.FC<Props> = () => {
  return (
    <a
      className='bmc-button'
      target='_blank noopener noreferrer'
      href='https://www.buymeacoffee.com/henryfellerhoff'
    >
      <img
        src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
        alt='Buy me a coffee'
      />
      <span style={{ marginLeft: 15, fontSize: 19 }}>Buy me a coffee</span>
    </a>
  );
};

export default CoffeeButton;
