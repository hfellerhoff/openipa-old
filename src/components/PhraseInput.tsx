import React from 'react';
import { Languages } from '../constants/Interfaces';

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  language: Languages;
  setLanguage: React.Dispatch<React.SetStateAction<Languages>>;
}

const PhraseInput: React.FC<Props> = ({
  inputText,
  setInputText,
  language,
  setLanguage,
}: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Languages);
  };

  const getNote = () => {
    if (
      language === Languages.German ||
      language === Languages.Italian ||
      language === Languages.French
    ) {
      return (
        <h3 className='ipa note'>
          <em>{`Note: ${language} word transcription is still very WIP, and not reliable in its current form.`}</em>
        </h3>
      );
    }
    return <></>;
  };

  return (
    <div>
      <h2 className='ipa header body'>
        Input some
        <select
          onChange={e => onSelectChange(e)}
          name='Language'
          className='ipa language-select'
          value={language}
        >
          <option value={Languages.Latin}>Latin</option>
          {/* <option value={Languages.German}>German</option>
          <option value={Languages.Italian}>Italian</option> */}
          <option value={Languages.French}>French</option>
        </select>
        text to transcribe:
      </h2>
      {getNote()}
      <form onSubmit={e => onSubmit(e)}>
        <textarea
          spellCheck={false}
          autoComplete='false'
          autoCorrect='false'
          autoCapitalize='false'
          value={inputText}
          rows={0}
          className='ipa input'
          onChange={e => onChange(e)}
        />
      </form>
    </div>
  );
};

export default PhraseInput;
