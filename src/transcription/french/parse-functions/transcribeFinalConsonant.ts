import { Phoneme } from '../../../constants/Interfaces';
import { isEndOfSentence } from '../../../util/Helper';
import {
  areNoMorePronouncedConsonants,
  isPronouncedConsonant,
} from '../FrenchHelper';
import IPA from '../../../constants/IPA';

const getRulePronounced = (letter: string, ipa: string): string => {
  return `Final 'c', 'r', 'f', and 'l' consonants are pronounced. ('${letter}' consonants are transcribed as [${ipa}].`;
};
const getRuleSilent = (letter: string): string => {
  return `Final '${letter}' consonants are silent.`;
};

const transcribeFinalConsonant = (
  phoneme: Phoneme,
  letters: string[],
  ipa?: IPA
): Phoneme => {
  if (isPronouncedConsonant(letters[0], isEndOfSentence(letters[1]))) {
    return {
      text: letters[0],
      ipa: ipa ? ipa : '',
      rule: getRulePronounced(letters[0], ipa ? ipa : ''),
    };
  } else if (
    isEndOfSentence(letters[1]) ||
    areNoMorePronouncedConsonants(letters, 0)
  ) {
    return {
      text: letters[0],
      ipa: '',
      rule: getRuleSilent(letters[0]),
    };
  }
  return phoneme;
};

export default transcribeFinalConsonant;
