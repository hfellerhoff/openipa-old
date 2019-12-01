import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import {
  isFrontVowel,
  isBackVowel,
  isEndOfSentence,
} from '../../../util/Helper';

const parseC = ({
  phoneme,
  indexToAdd,
  nextletter,
}: ParseLetterProps): ParseLetterReturn => {
  // --- 'ç' ---
  if (nextletter[0] === 'ç') {
    return [
      {
        text: 'ç',
        ipa: IPA.S,
        rule: Rules.C_SQUIGLE,
      },
      0,
    ];
  }

  // --- 'ch' ---
  if (nextletter[1] === 'h') {
    return [
      {
        text: 'ch',
        ipa: IPA.FRICATIVE_C,
        rule: Rules.CH,
      },
      1,
    ];
  }

  // --- C + Front Vowel ---
  if (isFrontVowel(nextletter[1])) {
    return [
      {
        text: 'c',
        ipa: IPA.S,
        rule: Rules.C_FRONTVOWEL,
      },
      0,
    ];
  }

  // --- C + Back Vowel / Final C
  if (isBackVowel(nextletter[1]) || isEndOfSentence(nextletter[1])) {
    return [
      {
        text: 'c',
        ipa: IPA.K,
        rule: Rules.C_BACKVOWEL,
      },
      0,
    ];
  }

  // --- Default ---
  return [phoneme, indexToAdd];
};

export default parseC;
