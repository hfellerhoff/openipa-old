import React, { useState } from 'react';
import { Languages } from '../../constants/Interfaces';
import TextInput from '../TextInput';
import ResultDisplay from '../ResultDisplay/ResultDisplay';
import './Demonstration.scss';
import parseLatin from '../../util/ParseLatin';

interface Props {}

const Demonstration: React.FC<Props> = () => {
  const [inputText, setInputText] = useState('Ave maria, gratia plena.');
  const [language] = useState(Languages.Latin);
  const [resultHeight, setResultHeight] = useState(0);

  return (
    <div className='ipa__landing-page__demonstration'>
      <div className='ipa__landing-page__demonstration-container-left'>
        <h1 className='ipa__landing-page__demonstration-title'>
          Why Open IPA?
        </h1>
        <p className='ipa__landing-page__demonstration-description'>
          Open IPA features text to IPA transcription in real-time. That means
          you can type out text, and Open IPA will transcribe it live in front
          of you, without having to wait for a transcription to be procesed. Try
          it out in the boxes!
        </p>
        <p className='ipa__landing-page__demonstration-description'>
          In addition to live transcription, Open IPA gives you nuanced feedback
          about each transcription. Try hovering over the syllables in the IPA
          result to see!
        </p>
      </div>
      <div style={{ width: 40, height: 40 }} />
      <div className='ipa__landing-page__demonstration-container-right'>
        <div className='ipa__landing-page__demonstration-container-right__container-left'>
          <TextInput
            inputText={inputText}
            setInputText={setInputText}
            theme='dark'
            displayHeight={resultHeight}
          />
          <h3 className='ipa__landing-page__demonstration__input-title'>
            {`${language} Text Input`}
          </h3>
        </div>
        <div className='ipa__landing-page__demonstration-container-right__container-right'>
          <ResultDisplay
            result={parseLatin(inputText)}
            theme='dark'
            setHeight={height => setResultHeight(height)}
          />
          <h3 className='ipa__landing-page__demonstration__input-title'>
            IPA Result
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Demonstration;
