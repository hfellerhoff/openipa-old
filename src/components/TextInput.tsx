import React, { CSSProperties } from 'react';
import './TextInput.scss';
import useWindowDimensions from './UseWindowDimensions';

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  theme?: 'dark' | 'light';
  displayHeight?: number;
  shouldHide?: boolean;
}

const TextInput: React.FC<Props> = ({
  inputText,
  setInputText,
  theme = 'light',
  displayHeight = 300,
  shouldHide,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
  };
  const { width } = useWindowDimensions();
  const className = `ipa__text-input--${theme}`;
  const isWidthSmallEnough = width <= 800 ? true : false;
  const textareaHeight = isWidthSmallEnough
    ? displayHeight * (1 / 2.95)
    : displayHeight;

  const visibleStyle: CSSProperties = {
    height: textareaHeight,
    visibility: 'visible',
  };

  const hiddenStyle: CSSProperties = {
    height: 0,
    visibility: 'hidden',
    margin: -250,
  };

  const style = isWidthSmallEnough && shouldHide ? hiddenStyle : visibleStyle;

  return (
    <textarea
      spellCheck={false}
      autoComplete='false'
      autoCorrect='false'
      autoCapitalize='false'
      value={inputText}
      rows={0}
      className={className}
      style={style}
      onChange={e => onChange(e)}
    />
  );
};

export default TextInput;
