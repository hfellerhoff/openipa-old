import React from 'react';
import { Languages } from '../../constants/Interfaces';
import { Link } from 'react-router-dom';
import './LanguageSelectButton.scss';

interface Props {
  language: Languages;
  status: 'active' | 'caution' | 'inactive';
}

const LanguageSelectButton: React.FC<Props> = ({ language, status }) => {
  const className = `ipa__landing-page__hero__button-container__button ipa__landing-page__hero__button-container__button--${status}`;

  if (status !== 'inactive') {
    return (
      <Link className={className} to={`/${language}`}>
        {language}
      </Link>
    );
  }
  return <div className={className}>{language}</div>;
};

export default LanguageSelectButton;
