import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import Rules from '../FrenchRules';
import IPA from '../../../constants/IPA';
import { isEndOfSentence } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseZ = ({
  nextletter,
  charArray,
  index,
}: ParseLetterProps): ParseLetterReturn => {
  // --- Final Z ---
  if (isEndOfSentence(nextletter[1])) {
    return [
      {
        text: 'z',
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
      text: 'z',
      ipa: IPA.Z,
      rule: Rules.Z,
    },
    0,
  ];
};

export default parseZ;
