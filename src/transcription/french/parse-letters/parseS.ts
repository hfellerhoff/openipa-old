import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import Rules from '../FrenchRules';
import IPA from '../../../constants/IPA';
import { isEndOfSentence, isVowel } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseS = ({
  nextletter,
  previousIPA,
  charArray,
  index,
}: ParseLetterProps): ParseLetterReturn => {
  // --- Intervocalic S ---
  if (isVowel(previousIPA) && isVowel(nextletter[1])) {
    return [
      {
        text: nextletter[0],
        ipa: IPA.Z,
        rule: Rules.INTERVOCALIC_S,
      },
      0,
    ];
  }

  // --- Double S ---
  if (nextletter[1] === nextletter[0]) {
    return [
      {
        text: nextletter[0] + nextletter[1],
        ipa: IPA.S,
        rule: Rules.S,
      },
      1,
    ];
  }

  // --- Final S ---
  if (isEndOfSentence(nextletter[1])) {
    return [
      {
        text: nextletter[0],
        ipa: '',
        rule: Rules.SILENT_FINAL_CONSONANT,
      },
      0,
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

  // --- Default ---
  return [
    {
      text: nextletter[0],
      ipa: IPA.S,
      rule: Rules.S,
    },
    0,
  ];
};

export default parseS;
