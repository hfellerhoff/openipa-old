import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isEndOfSentence } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseJ = ({
  charArray,
  index,
  nextletter,
}: ParseLetterProps): ParseLetterReturn => {
  // --- Final J ---
  if (isEndOfSentence(nextletter[1])) {
    return [
      {
        text: 'j',
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
      text: 'j',
      ipa: IPA.FRICATIVE_G,
      rule: Rules.J,
    },
    0,
  ];
};

export default parseJ;
