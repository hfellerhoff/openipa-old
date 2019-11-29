import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Languages, Result } from '../constants/Interfaces';
import TextInput from '../components/TextInput';
import ResultDisplay from '../components/ResultDisplay/ResultDisplay';
import parseLatin from '../util/ParseLatin';
import parseFrench from '../util/ParseFrench';
import { PulseLoader } from 'react-spinners';

import './TranscriptionPage.scss';
import createPDFFromResult from '../util/CreatePDF';
import copyResult from '../util/CopyResult';

type Props = {
  language: string;
};

const TranscriptionPage: React.FC<RouteComponentProps<Props>> = ({
  match: {
    params: { language },
  },
}) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<Result>({
    lines: [
      {
        words: [
          {
            syllables: [],
          },
        ],
      },
    ],
  });
  const [resultHeight, setResultHeight] = useState(0);
  const [shouldShowInput, setShouldShowInput] = useState(true);
  const [shouldShowOutput, setShouldShowOutput] = useState(true);
  const [isPDFCreated, setIsPDFCreated] = useState(true);

  const parseText = (text: string) => {
    switch (language as Languages) {
      case Languages.Latin:
        return parseLatin(text);
      case Languages.French:
        return parseFrench(text);
      default:
        return parseLatin(text);
    }
  };

  const getNote = (): string => {
    switch (language as Languages) {
      case Languages.Latin:
        return '';
      case Languages.French:
        return 'Transcription for French is still incomplete, and may be lacking transcription rules and exceptions.';
      default:
        return '';
    }
  };

  const createPDF = () => {
    setIsPDFCreated(false);
    setTimeout(() => {
      createPDFFromResult(language as Languages, result).then(() =>
        setIsPDFCreated(true)
      );
    }, 400);
    // I know this whole function is kinda gross, but for some reason
    // this is more responsive than having no delay whatsoever
  };

  useEffect(() => {
    setResult(parseText(inputText));
    // eslint-disable-next-line
  }, [inputText]);

  if (language in Languages) {
    return (
      <div className='ipa__transcription__container'>
        <h1 className='ipa__transcription__title'>
          {language + ' Transcription'}
        </h1>
        <p className='ipa__transcription__note'>{getNote()}</p>
        <p className='ipa__transcription__note' style={{ marginTop: 10 }}>
          Open IPA is a new service, so our database of exceptions is limited.
          If you find a transcription error or exception, please reach out to
          <a
            href={`mailto:henryfellerhoff+openipa@gmail.com?subject=Feedback for Open IPA`}
          >
            <span className='ipa__transcription__email'>
              henryfellerhoff@gmail.com.
            </span>
          </a>
        </p>
        <div className='ipa__transcription__input-container'>
          <div className='ipa__transcription__input-container-left'>
            <div className='ipa__transcription__input-container-top'>
              <h3 className='ipa__transcription__input-title'>Text Input</h3>
              <button
                className='ipa__transcription__input-hide-button'
                onClick={() => setShouldShowInput(!shouldShowInput)}
              >
                {shouldShowInput ? 'Hide' : 'Show'}
              </button>
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
              <h3 className='ipa__transcription__input-title'>
                IPA Transcription
              </h3>
              <button
                className='ipa__transcription__input-hide-button'
                onClick={() => setShouldShowOutput(!shouldShowOutput)}
              >
                {shouldShowOutput ? 'Hide' : 'Show'}
              </button>
            </div>
            <ResultDisplay
              result={result}
              setHeight={height => setResultHeight(height)}
              shouldHide={!shouldShowOutput}
            />
          </div>
        </div>
        <div className='ipa__transcription__export-container'>
          <button
            onClick={() => createPDF()}
            className='ipa__transcription__export-button'
          >
            {isPDFCreated ? (
              'Export as PDF'
            ) : (
              <PulseLoader color='white' size={10} />
            )}
          </button>
          <div style={{ width: 15, height: 15 }}></div>
          <button
            onClick={() => copyResult(result)}
            className='ipa__transcription__export-button'
          >
            Copy
          </button>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/ipa' />;
  }
};

export default TranscriptionPage;
