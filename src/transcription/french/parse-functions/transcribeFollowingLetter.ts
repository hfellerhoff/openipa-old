import { Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isFrontVowel } from '../../../util/Helper';

const getRule = (text: string, ipa: string): string => {
  return `'${text}' letter groups are transcribed as [${ipa}].`;
};

const transcribeFollowingLetter = (
  phoneme: Phoneme,
  letters: string[],
  followingLetter: string,
  ipa: IPA
): Phoneme => {
  if (letters[1] === followingLetter) {
    const text = letters[0] + letters[1];
    return {
      text,
      ipa,
      rule: getRule(text, ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingLetter;
