import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import Rules from '../FrenchRules';
import IPA from '../../../constants/IPA';
import { isEndOfSentence } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseP = ({
  nextletter,
  charArray,
  index,
}: ParseLetterProps): ParseLetterReturn => {
  // --- Final P ---
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

  // --- Double P ---
  if (nextletter[1] === nextletter[0]) {
    return [
      {
        text: nextletter[0] + nextletter[1],
        ipa: IPA.P,
        rule: Rules.P,
      },
      1,
    ];
  }

  // --- Default ---
  return [
    {
      text: nextletter[0],
      ipa: IPA.P,
      rule: Rules.P,
    },
    0,
  ];
};

export default parseP;
