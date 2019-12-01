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
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseG = ({
  phoneme,
  index,
  indexToAdd,
  charArray,
  nextletter,
}: ParseLetterProps): ParseLetterReturn => {
  // --- 'gn' ---
  if (nextletter[1] === 'n') {
    return [
      {
        text: 'gn',
        ipa: IPA.BACK_SWOOP_N,
        rule: Rules.GN,
      },
      1,
    ];
  }

  // --- 'gu' ---
  if (nextletter[1] === 'u') {
    return [
      {
        text: 'gu',
        ipa: IPA.G,
        rule: Rules.GU,
      },
      1,
    ];
  }

  // --- No more pronounced consonants ---
  if (areNoMorePronouncedConsonants(charArray, index)) {
    return [
      {
        text: nextletter[0],
        ipa: '',
        rule: Rules.SILENT_FINAL_CONSONANT,
      },
      0,
    ];
  }

  // --- G + Front Vowel ---
  if (isFrontVowel(nextletter[1])) {
    return [
      {
        text: 'g',
        ipa: IPA.FRICATIVE_G,
        rule: Rules.G_FRONTVOWEL,
      },
      0,
    ];
  }

  // --- G + Back Vowel ---
  if (isBackVowel(nextletter[1])) {
    return [
      {
        text: 'g',
        ipa: IPA.G,
        rule: Rules.G_BACKVOWEL,
      },
      0,
    ];
  }

  // --- Final G ---
  if (isEndOfSentence(nextletter[1])) {
    return [
      {
        text: 'g',
        ipa: '',
        rule: Rules.SILENT_FINAL_CONSONANT,
      },
      0,
    ];
  }

  // --- Default ---
  return [phoneme, indexToAdd];
};

export default parseG;
