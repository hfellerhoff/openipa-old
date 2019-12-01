import React from 'react';
import checkmark from '../../assets/checkmark.png';
import './CheckboxButton.scss';

interface Props {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckboxButton: React.FC<Props> = ({ isChecked, setIsChecked }) => {
  return (
    <button
      className='ipa__transcription__option-checkbox'
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked ? (
        <img
          src={checkmark}
          alt=''
          className='ipa__transcription__option-checkbox-image'
        />
      ) : (
        <></>
      )}
    </button>
  );
};

export default CheckboxButton;
