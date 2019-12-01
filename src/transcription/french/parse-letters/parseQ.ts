import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isEndOfSentence } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseQ = ({
  charArray,
  index,
  nextletter,
  phoneme,
  indexToAdd,
}: ParseLetterProps): ParseLetterReturn => {
  // --- 'qu' ---
  if (nextletter[1] === 'u') {
    return [
      {
        text: 'qu',
        ipa: IPA.K,
        rule: Rules.QU,
      },
      1,
    ];
  }

  // --- Final Q ---
  if (isEndOfSentence(nextletter[1])) {
    return [
      {
        text: 'q',
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
  return [phoneme, indexToAdd];
};

export default parseQ;
