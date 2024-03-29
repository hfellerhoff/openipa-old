import React from 'react';
import LanguageSelectButton from '../buttons/LanguageSelectButton';
import { Languages } from '../../constants/Interfaces';
import './LanguageSelectionButtons.scss';

interface Props {}

const LanguageSelectionButtons: React.FC<Props> = () => {
  return (
    <div className='ipa__landing-page__hero__button-container'>
      <LanguageSelectButton language={Languages.Latin} status='active' />
      <LanguageSelectButton language={Languages.French} status='active' />
      <LanguageSelectButton language={Languages.Italian} status='inactive' />
      <LanguageSelectButton language={Languages.German} status='inactive' />
    </div>
  );
};

export default LanguageSelectionButtons;
