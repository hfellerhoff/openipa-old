import React, { useState, useEffect } from 'react';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import parseLatin from '../../transcription/latin/ParseLatin';
import parseFrench from '../../transcription/french/ParseFrench';
import { Result, Languages } from '../../constants/Interfaces';
import './TranscriptionEditor.scss';
import HideButton from '../buttons/HideButton';

interface Props {
  language: string;
  shouldAnalyzeElision: boolean;
  shouldAnalyzeLiason: boolean;
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}

const TranscriptionEditor: React.FC<Props> = ({
  language,
  shouldAnalyzeElision,
  shouldAnalyzeLiason,
  result,
  setResult,
}) => {
  const [inputText, setInputText] = useState('');
  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);

  const [resultHeight, setResultHeight] = useState(0);

  const parseText = (text: string) => {
    switch (language as Languages) {
      case Languages.Latin:
        return parseLatin(text);
      case Languages.French:
        return parseFrench(text, shouldAnalyzeElision, shouldAnalyzeLiason);
      default:
        return parseLatin(text);
    }
  };

  useEffect(() => {
    setResult(parseText(inputText));
  }, [inputText, shouldAnalyzeElision, shouldAnalyzeLiason]);

  return (
    <div className='ipa__transcription__input-container'>
      <div className='ipa__transcription__input-container-left'>
        <div className='ipa__transcription__input-container-top'>
          <h3 className='ipa__transcription__input-title'>Text Input</h3>
          <HideButton
            shouldShow={shouldShowInput}
            setShouldShow={setShouldShowInput}
          />
        </div>
        <TextInput
          inputText={inputText}
          setInputText={setInputText}
          displayHeight={resultHeight}
          shouldHide={!shouldShowInput}
        />
      </div>
      <div className='ipa__transcription__input-container-right'>
        <div className='ipa__transcription__input-container-top'>
          <h3 className='ipa__transcription__input-title'>IPA Transcription</h3>
          <HideButton
            shouldShow={shouldShowOutput}
            setShouldShow={setShouldShowOutput}
          />
        </div>
        <ResultDisplay
          result={result}
          setHeight={height => setResultHeight(height)}
          shouldHide={!shouldShowOutput}
        />
      </div>
    </div>
  );
};

export default TranscriptionEditor;
