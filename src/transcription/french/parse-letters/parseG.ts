import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeDoubleLetter from '../parse-functions/transcribeDoubleLetter';
import transcribeFollowingBackVowel from '../parse-functions/transcribeFollowingBackVowel';
import transcribeFollowingFrontVowel from '../parse-functions/transcribeFollowingFrontVowel';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeFollowingLetter from '../parse-functions/transcribeFollowingLetter';

const parseG = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeFinalConsonant(phoneme, nextletter);
  phoneme = transcribeFollowingFrontVowel(phoneme, nextletter, IPA.FRICATIVE_G);
  phoneme = transcribeFollowingBackVowel(phoneme, nextletter, IPA.G);

  // --- 'gn' ---
  phoneme = transcribeFollowingLetter(
    phoneme,
    nextletter,
    'n',
    IPA.BACK_SWOOP_N
  );

  // --- 'gu' ---
  phoneme = transcribeFollowingLetter(phoneme, nextletter, 'u', IPA.G);

  phoneme = transcribeDoubleLetter(phoneme, nextletter);

  return phoneme;
};

export default parseG;
