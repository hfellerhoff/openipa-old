import React from 'react';

interface Props {
  onSampleTranscription: () => void;
}

const Description: React.FC<Props> = ({ onSampleTranscription }: Props) => {
  return (
    <>
      {/* <div className='ipa horizontal-line'></div> */}
      <div className='ipa content-container'>
        <h1 className='ipa description header'>What is Open IPA?</h1>
        <p className='ipa description body'>
          Open IPA is a quick, free, education-focused IPA transcription tool
          that can transcribe Latin texts into IPA in real time, with plans for
          Italian, German, and French.
        </p>
        <p className='ipa description body'>
          Many transcription tools function as a bit of a "black box", spitting
          out IPA with seemingly no clear process. Open IPA aims to fix this by
          providing each user with not only correct IPA but also the thought
          process behind the IPA.
        </p>
        <button
          className='ipa description button'
          onClick={onSampleTranscription}
        >
          <h3 className='ipa description buttonheader'>New to Open IPA?</h3>
          Try out a Sample Transcription
        </button>
        <p className='ipa description body'>
          When you transcribe anything with Open IPA, you get back both the
          transcription and the transcription rules. By hovering over or tapping
          on a letter, you can gain a greater insight into the process of
          transcribing in a given language.
        </p>
        <p className='ipa description body'>
          Have any ideas for Open IPA? Shoot me an email at{' '}
          <a
            href='mailto: henryfellerhoff@gmail.com?subject=Feedback for Open IPA'
            className='ipa description email'
          >
            henryfellerhoff@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default Description;
