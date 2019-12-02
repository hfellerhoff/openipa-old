import React, { useState } from 'react';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import { Languages } from '../../constants/Interfaces';
import './TranscriptionDescription.scss';
import HideButton from '../buttons/HideButton';
import CheckboxButton from '../buttons/CheckboxButton';

interface Props {
  language: string;
  shouldAnalyzeElision: boolean;
  setShouldAnalyzeElision: React.Dispatch<React.SetStateAction<boolean>>;
  shouldAnalyzeLiason: boolean;
  setShouldAnalyzeLiason: React.Dispatch<React.SetStateAction<boolean>>;
}

const TranscriptionDescription: React.FC<Props> = ({
  language,
  shouldAnalyzeElision,
  setShouldAnalyzeElision,
  shouldAnalyzeLiason,
  setShouldAnalyzeLiason,
}) => {
  const [shouldShowNotes, setShouldShowNotes] = useState(true);
  const { width } = useWindowDimensions();
  const isWidthSmallEnough = width <= 800 ? true : false;

  const getSpecificElements = () => {
    switch (language as Languages) {
      case Languages.Latin:
        return <></>;
      case Languages.French:
        return (
          <div>
            <div style={{ height: 15 }}></div>
            <h3 className='ipa__transcription__input-title ipa__transcription__options-title'>
              Transcription Options
            </h3>
            <div className='ipa__transcription__options-container'>
              <div className='ipa__transcription__option-container'>
                <CheckboxButton
                  isChecked={shouldAnalyzeElision}
                  setIsChecked={setShouldAnalyzeElision}
                />
                <h5 className='ipa__transcription__option-title'>
                  Analyze Elision
                </h5>
              </div>
              <div style={{ height: 10 }}></div>
              <div className='ipa__transcription__option-container'>
                <CheckboxButton
                  isChecked={shouldAnalyzeLiason}
                  setIsChecked={setShouldAnalyzeLiason}
                />
                <h5 className='ipa__transcription__option-title'>
                  Analyze Liason (Beta)
                </h5>
              </div>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };

  const getDescription = () => {
    if (shouldShowNotes || !isWidthSmallEnough) {
      return (
        <div className='ipa__transcription__header'>
          <p className='ipa__transcription__note' style={{ marginTop: 10 }}>
            Open IPA is a new service, so our database of exceptions is limited.
            If you find a transcription error or exception, please reach out to
            us on Reddit at
            <a
              href='https://www.reddit.com/r/openipa/'
              target='_blank noopener noreferrer'
            >
              <span className='ipa__transcription__email'>/r/openipa.</span>
            </a>
          </p>
          {getSpecificElements()}
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className='ipa__transcription__title-container'>
        <h1 className='ipa__transcription__title' style={{ flex: 1 }}>
          {capitalizeFirstLetter(language) + ' Transcription'}
        </h1>
        <HideButton
          shouldShow={shouldShowNotes}
          setShouldShow={setShouldShowNotes}
        />
      </div>
      {getDescription()}
    </>
  );
};

export default TranscriptionDescription;
