import { Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';

const getRule = (text: string, ipa: string): string => {
  return `'${text}' letters are transcribed as [${ipa}].`;
};

const transcribeLetter = (
  phoneme: Phoneme,
  letters: string[],
  letter: string,
  ipa: IPA
): Phoneme => {
  if (letters[0] === letter) {
    return {
      text: letters[0],
      ipa: ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeLetter;
