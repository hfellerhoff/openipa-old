import { ParseLetterProps, Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import transcribeFinalConsonant from '../parse-functions/transcribeFinalConsonant';
import transcribeLetter from '../parse-functions/transcribeLetter';

const parseJ = ({ phoneme, nextletter }: ParseLetterProps): Phoneme => {
  phoneme = transcribeLetter(phoneme, nextletter, 'j', IPA.FRICATIVE_G);
  phoneme = transcribeFinalConsonant(phoneme, nextletter);

  return phoneme;
};

export default parseJ;
