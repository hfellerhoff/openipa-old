import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import { isEndOfSentence } from '../../../util/Helper';
import { isNasalCanceling } from '../FrenchHelper';

const parseR = ({
  phoneme,
  indexToAdd,
  nextletter,
  previousIPA,
}: ParseLetterProps): ParseLetterReturn => {
  // --- Inital '-rest' ---
  if (
    isEndOfSentence(previousIPA) &&
    nextletter[1] === 'e' &&
    nextletter[2] === 's' &&
    nextletter[3] === 't'
  ) {
    return [
      {
        text: 'rest',
        ipa: IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.T,
        rule: Rules.INITIAL_REST,
      },
      3,
    ];
  }

  // --- Inital '-resp' ---
  if (
    isEndOfSentence(previousIPA) &&
    nextletter[1] === 'e' &&
    nextletter[2] === 's' &&
    nextletter[3] === 'p'
  ) {
    return [
      {
        text: 'resp',
        ipa: IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.P,
        rule: Rules.INITIAL_REST,
      },
      3,
    ];
  }

  // --- '-re' prefix ---
  if (
    isEndOfSentence(previousIPA) &&
    nextletter[1] === 'e' &&
    !(
      nextletter[2] === 'n' ||
      (nextletter[2] === 'm' && !isNasalCanceling(nextletter[3]))
    )
  ) {
    return [
      {
        text: 're',
        ipa: IPA.FLIPPED_R + IPA.SCHWA,
        rule: Rules.RE_PREFIX,
      },
      1,
    ];
  }

  // --- Double 'r' ---
  if (nextletter[1] === 'r') {
    return [
      {
        text: 'rr',
        ipa: IPA.FLIPPED_R,
        rule: Rules.R,
      },
      1,
    ];
  }

  // --- Default ---
  return [
    {
      text: 'r',
      ipa: IPA.FLIPPED_R,
      rule: Rules.R,
    },
    0,
  ];
};

export default parseR;
