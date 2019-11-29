import { isConsonant, isEndOfSentence, isVowel } from './Helper';
import Letters from './Letters';

const PRONOUNCED_CONSONANTS = ['c', 'r', 'f', 'l'];

export const isPronouncedConsonant = (consonant: string, isFinal: boolean) => {
  if (isFinal) {
    return PRONOUNCED_CONSONANTS.indexOf(consonant.toLowerCase()) !== -1;
  } else {
    return isConsonant(consonant);
  }
};

export const isGlideFollowing = (
  letter: string,
  nextletter: string,
  nextlettersecond: string,
  nextletterthird: string,
  nextletterfourth: string
) => {
  // console.log('----');
  // console.log(nextletter);
  // console.log(nextlettersecond);
  // console.log(nextletterthird);
  const isMedialILL =
    nextletter === 'i' &&
    nextlettersecond === 'l' &&
    nextletterthird === 'l' &&
    !isEndOfSentence(nextletterfourth);

  const isVowelIL =
    isVowel(letter) && nextletter === 'i' && nextlettersecond === 'l';

  return isMedialILL || isVowelIL;
};

export const isNasalCanceling = (char: string) => {
  return ['m', 'n', 'h', ...Letters.vowels].indexOf(char.toLowerCase()) !== -1;
};
