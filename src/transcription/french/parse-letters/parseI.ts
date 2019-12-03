import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import Rules from '../FrenchRules';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeDefault from '../parse-functions/transcribeDefault';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import { isEndOfSentence, isConsonant, isVowel } from '../../../util/Helper';
import { isNasalCanceling } from '../FrenchHelper';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseI = ({
  nextletter,
  phoneme,
  previousIPA,
}: ParseLetterProps): Phoneme => {
  // Initial -ill, -irr, -inn, -mm
  if (
    nextletter[1] + nextletter[2] === 'll' ||
    nextletter[1] + nextletter[2] === 'rr' ||
    nextletter[1] + nextletter[2] === 'nn' ||
    nextletter[1] + nextletter[2] === 'mm'
  ) {
    phoneme = {
      text: 'i' + nextletter[1] + nextletter[2],
      ipa: IPA.CLOSED_I + nextletter[1] + nextletter[2],
      rule: Rules.INITIAL_ILRNM,
    };
  }
  // Final -ient verb
  else if (
    nextletter[1] === 'e' &&
    nextletter[2] === 'n' &&
    nextletter[3] === 't' &&
    isEndOfSentence(nextletter[4])
  ) {
    phoneme = {
      text: 'ient',
      ipa: IPA.J_GLIDE + IPA.NASAL_E,
      rule: Rules.FINAL_VERB_IENT,
    };
  }
  // in and im nasal
  else if (
    (nextletter[1] === 'm' || nextletter[1] === 'n') &&
    ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
      isEndOfSentence(nextletter[4]))
  ) {
    phoneme = {
      text: 'i' + nextletter[1],
      ipa: IPA.NASAL_E,
      rule: Rules.NASAL_AIM,
    };
  }

  // Medial ill
  else if (
    !isEndOfSentence(previousIPA) &&
    nextletter[1] === 'l' &&
    nextletter[2] === 'l' &&
    !isEndOfSentence(nextletter[3])
  ) {
    if (isConsonant(previousIPA)) {
      phoneme = {
        text: 'ill',
        ipa: IPA.CLOSED_I + IPA.J_GLIDE,
        rule: Rules.MEDIAL_ILL_CONSONANT,
      };
    } else if (isVowel(previousIPA)) {
      phoneme = {
        text: 'ill',
        ipa: IPA.J_GLIDE,
        rule: Rules.MEDIAL_ILL_VOWEL,
      };
    }
  }
  // vowel + il
  else if (isVowel(previousIPA) && nextletter[1] === 'l') {
    phoneme = {
      text: 'il',
      ipa: IPA.J_GLIDE,
      rule: Rules.VOWEL_IL,
    };
  }
  // Final -ie
  else if (nextletter[1] === 'e' && isEndOfSentence(nextletter[2])) {
    phoneme = {
      text: 'ie',
      ipa: IPA.CLOSED_I,
      rule: Rules.FINAL_IE,
    };
  } else if (isVowel(nextletter[1])) {
    phoneme = {
      text: 'i',
      ipa: IPA.J_GLIDE,
      rule: Rules.IY_VOWEL,
    };
  } else {
    phoneme = {
      text: 'i',
      ipa: IPA.CLOSED_I,
      rule: Rules.SINGLE_I_OR_Y,
    };
  }

  phoneme = transcribeLetter(phoneme, nextletter, 'î', IPA.CLOSED_I);
  phoneme = transcribeLetter(phoneme, nextletter, 'ï', IPA.CLOSED_I);

  // --- Default ---
  return phoneme;
};

export default parseI;
