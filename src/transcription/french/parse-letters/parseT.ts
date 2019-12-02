import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import Rules from '../FrenchRules';
import IPA from '../../../constants/IPA';
import { isEndOfSentence } from '../../../util/Helper';
import { areNoMorePronouncedConsonants } from '../FrenchHelper';

const parseT = ({
  nextletter,
  charArray,
  index,
}: ParseLetterProps): ParseLetterReturn => {
  // --- t + ion/iel/ieux ---
  if (
    (nextletter[1] + nextletter[2] + nextletter[3] === 'ion' &&
      isEndOfSentence(nextletter[4])) ||
    (nextletter[1] + nextletter[2] + nextletter[3] === 'iel' &&
      isEndOfSentence(nextletter[4])) ||
    (nextletter[1] + nextletter[2] + nextletter[3] + nextletter[4] === 'ieux' &&
      isEndOfSentence(nextletter[5]))
  ) {
    return [
      {
        text: 't',
        ipa: IPA.S,
        rule: Rules.FINAL_TION,
      },
      0,
    ];
  }

  // --- th ---
  if (nextletter[1] === 'h') {
    return [
      {
        text: 'th',
        ipa: IPA.T,
        rule: Rules.TH,
      },
      1,
    ];
  }

  // --- Double T ---
  if (nextletter[1] === 't') {
    return [
      {
        text: 'tt',
        ipa: IPA.T,
        rule: Rules.T,
      },
      1,
    ];
  }

  // --- Final T ---
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
      text: 't',
      ipa: IPA.T,
      rule: Rules.T,
    },
    0,
  ];
};

export default parseT;
