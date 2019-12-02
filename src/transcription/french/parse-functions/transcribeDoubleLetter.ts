import { Phoneme } from '../../../constants/Interfaces';

const getDoubleLetterRule = (letter: string): string => {
  return `Double '${letter +
    letter}' consonants are transcribed as a single [${letter}].`;
};

const transcribeDoubleLetter = (
  phoneme: Phoneme,
  letters: string[]
): Phoneme => {
  if (letters[0] === letters[1]) {
    return {
      text: letters[0] + letters[1],
      ipa: letters[0],
      rule: getDoubleLetterRule(letters[0]),
    };
  }
  return phoneme;
};

export default transcribeDoubleLetter;
