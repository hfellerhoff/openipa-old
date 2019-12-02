import { Phoneme } from '../../../constants/Interfaces';

const getRule = (text: string, ipa: string): string => {
  return `If no other transcription rule applies, '${text}' letters are transcribed as [${ipa}].`;
};

const transcribeDefault = (letters: string[], ipa: string): Phoneme => {
  return {
    text: letters[0],
    ipa: ipa,
    rule: getRule(letters[0], ipa),
  };
};

export default transcribeDefault;
