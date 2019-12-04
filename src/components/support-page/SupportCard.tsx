import React, { useState } from 'react';
import './SupportCard.scss';

interface Props {
  title: string;
  description: string;
  position: 'left' | 'right';
  otherHeight: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

const SupportCard: React.FC<Props> = ({
  title,
  description,
  position,
  children,
}) => {
  const className = `ipa__support-card__container ipa__support-card__container--${position}`;
  return (
    <div className={className}>
      <h1 className='ipa__support-card__title'>{title}</h1>
      <p className='ipa__support-card__description'>{description}</p>
      <div className='ipa__support-card__button-container'>{children}</div>
    </div>
  );
};

export default SupportCard;
