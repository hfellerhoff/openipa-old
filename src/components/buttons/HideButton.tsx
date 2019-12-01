import React from 'react';
import './HideButton.scss';

interface Props {
  shouldShow: boolean;
  setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const HideButton: React.FC<Props> = ({ shouldShow, setShouldShow }) => {
  return (
    <button
      className='ipa__transcription__hide-button'
      onClick={() => setShouldShow(!shouldShow)}
    >
      {shouldShow ? 'Hide' : 'Show'}
    </button>
  );
};

export default HideButton;
