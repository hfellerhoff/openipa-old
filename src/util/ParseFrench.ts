import {
  getCharArray,
  isConsonant,
  isVowel,
  isFrontVowel,
  getNextWord,
  isPunctuation,
  isEndingPunctuation,
  isEndOfSentence,
  isBackVowel,
} from './Helper';
import { IPA, Result, Phoneme } from '../constants/Interfaces';
import Rules from '../constants/FrenchRules';
import Exceptions from '../constants/FrenchExceptions';
import Notes from '../constants/FrenchNotes';
import {
  isPronouncedConsonant,
  isGlideFollowing,
  isNasalCanceling,
} from './FrenchHelper';

const parseFrench = (text: string) => {
  const charArray = getCharArray(text);

  let result: Result = {
    lines: [
      {
        words: [
          {
            syllables: [],
          },
        ],
      },
    ],
  };

  let previousPhoneme = '';
  let startOfNewWord = true;

  for (let index = 0; index < charArray.length; index += 1) {
    const letter = charArray[index];
    let phoneme: Phoneme = {
      text: letter,
      ipa: letter,
      rule: Rules.UNKNOWN,
    };
    let indexToAdd = 0;

    // let previousLetter = '';
    // if (index > 0) {
    //   previousLetter = charArray[index - 1];
    // }

    let nextLetter = '';
    if (index < charArray.length - 1) {
      nextLetter = charArray[index + 1];
    }

    let nextlettersecond = '';
    if (index < charArray.length - 2) {
      nextlettersecond = charArray[index + 2];
    }

    let nextletterthird = '';
    if (index < charArray.length - 3) {
      nextletterthird = charArray[index + 3];
    }

    let nextletterfourth = '';
    if (index < charArray.length - 4) {
      nextletterfourth = charArray[index + 4];
    }

    let nextletterfifth = '';
    if (index < charArray.length - 5) {
      nextletterfifth = charArray[index + 5];
    }

    let nextlettersixth = '';
    if (index < charArray.length - 6) {
      nextletterfifth = charArray[index + 6];
    }

    switch (letter) {
      // CONSONANTS
      case 'c':
        if (nextLetter === 'h') {
          phoneme = {
            text: 'ch',
            ipa: IPA.FRICATIVE_C,
            rule: Rules.CH,
          };
          indexToAdd = 1;
        } else if (isFrontVowel(nextLetter)) {
          phoneme = {
            text: 'c',
            ipa: IPA.S,
            rule: Rules.C_FRONTVOWEL,
          };
        } else if (isBackVowel(nextLetter) || isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'c',
            ipa: IPA.K,
            rule: Rules.C_BACKVOWEL,
          };
        }
        break;
      case 'g':
        if (nextLetter === 'n') {
          phoneme = {
            text: 'gn',
            ipa: IPA.BACK_SWOOP_N,
            rule: Rules.GN,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'u') {
          phoneme = {
            text: 'gu',
            ipa: IPA.G,
            rule: Rules.GU,
          };
          indexToAdd = 1;
        } else if (isFrontVowel(nextLetter)) {
          phoneme = {
            text: 'g',
            ipa: IPA.FRICATIVE_G,
            rule: Rules.G_FRONTVOWEL,
          };
        } else if (isBackVowel(nextLetter)) {
          phoneme = {
            text: 'g',
            ipa: IPA.G,
            rule: Rules.G_BACKVOWEL,
          };
        } else if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'g',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'ç':
        phoneme = {
          text: 'ç',
          ipa: IPA.S,
          rule: Rules.C_SQUIGLE,
        };
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'ç',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'h':
        phoneme = {
          text: 'h',
          ipa: '',
          rule: Rules.H,
        };
        break;
      case 'j':
        phoneme = {
          text: 'j',
          ipa: IPA.FRICATIVE_G,
          rule: Rules.J,
        };
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'j',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'q':
        if (nextLetter === 'u') {
          phoneme = {
            text: 'qu',
            ipa: IPA.K,
            rule: Rules.QU,
          };
          indexToAdd = 1;
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'q',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'r':
        // Inital -rest
        if (
          isEndOfSentence(previousPhoneme) &&
          nextLetter === 'e' &&
          nextlettersecond === 's' &&
          nextletterthird === 't'
        ) {
          console.log(previousPhoneme);
          phoneme = {
            text: 'rest',
            ipa: IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.T,
            rule: Rules.INITIAL_REST,
          };
          indexToAdd = 3;
        }
        // Inital -resp
        else if (
          isEndOfSentence(previousPhoneme) &&
          nextLetter === 'e' &&
          nextlettersecond === 's' &&
          nextletterthird === 'p'
        ) {
          phoneme = {
            text: 'resp',
            ipa: IPA.FLIPPED_R + IPA.OPEN_E + IPA.S + IPA.P,
            rule: Rules.INITIAL_REST,
          };
          indexToAdd = 3;
        }
        // -re prefix
        else if (isEndOfSentence(previousPhoneme) && nextLetter === 'e') {
          phoneme = {
            text: 're',
            ipa: IPA.FLIPPED_R + IPA.SCHWA,
            rule: Rules.RE_PREFIX,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'r') {
          phoneme = {
            text: 'rr',
            ipa: IPA.FLIPPED_R,
            rule: Rules.R,
          };
          indexToAdd = 1;
        } else
          phoneme = {
            text: 'r',
            ipa: IPA.FLIPPED_R,
            rule: Rules.R,
          };
        break;
      case 'z':
        phoneme = {
          text: 'z',
          ipa: IPA.Z,
          rule: Rules.Z,
        };
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'z',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 's':
        if (isVowel(previousPhoneme) && isVowel(nextLetter)) {
          phoneme = {
            text: 's',
            ipa: IPA.Z,
            rule: Rules.INTERVOCALIC_S,
          };
        } else if (nextLetter === 's') {
          phoneme = {
            text: 'ss',
            ipa: IPA.S,
            rule: Rules.S,
          };
          indexToAdd = 1;
        } else if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 's',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else {
          phoneme = {
            text: 's',
            ipa: IPA.S,
            rule: Rules.S,
          };
        }
        break;
      case 't':
        if (
          nextLetter + nextlettersecond + nextletterthird === 'ion' &&
          isEndOfSentence(nextletterfourth)
        ) {
          phoneme = {
            text: 't',
            ipa: IPA.S,
            rule: Rules.FINAL_TION,
          };
        } else if (
          nextLetter + nextlettersecond + nextletterthird === 'iel' &&
          isEndOfSentence(nextletterfourth)
        ) {
          phoneme = {
            text: 't',
            ipa: IPA.S,
            rule: Rules.FINAL_TION,
          };
        } else if (
          nextLetter + nextlettersecond + nextletterthird + nextletterfourth ===
            'ieux' &&
          isEndOfSentence(nextletterfifth)
        ) {
          phoneme = {
            text: 't',
            ipa: IPA.S,
            rule: Rules.FINAL_TION,
          };
        } else if (nextLetter === 'h') {
          phoneme = {
            text: 'th',
            ipa: IPA.T,
            rule: Rules.TH,
          };
          indexToAdd = 1;
        } else if (nextLetter === 't') {
          phoneme = {
            text: 'tt',
            ipa: IPA.T,
            rule: Rules.T,
          };
          indexToAdd = 1;
        } else if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 't',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else {
          phoneme = {
            text: 't',
            ipa: IPA.T,
            rule: Rules.T,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 't',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'x':
        if (isVowel(nextLetter) || nextLetter === 'h') {
          phoneme = {
            text: 'x',
            ipa: IPA.G + IPA.Z,
            rule: Rules.X_VOWEL,
          };
        } else if (isConsonant(nextLetter)) {
          phoneme = {
            text: 'x',
            ipa: IPA.K + IPA.S,
            rule: Rules.X_CONSONANT,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'x',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'p':
        if (nextLetter === 'h') {
          phoneme = {
            text: 'ph',
            ipa: IPA.F,
            rule: Rules.PH,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'p') {
          phoneme = {
            text: 'pp',
            ipa: IPA.P,
            rule: Rules.P,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'p',
            ipa: IPA.P,
            rule: Rules.P,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'p',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'b':
        if (nextLetter === 's' || nextLetter === 't') {
          phoneme = {
            text: 'b',
            ipa: IPA.P,
            rule: Rules.B_ST,
          };
        } else if (nextLetter === 'b') {
          phoneme = {
            text: 'bb',
            ipa: IPA.B,
            rule: Rules.B,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'b',
            ipa: IPA.B,
            rule: Rules.B,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'b',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'f':
        if (
          nextLetter === 'a' &&
          nextlettersecond === 'i' &&
          nextletterthird === 's' &&
          isVowel(nextletterfourth)
        ) {
          phoneme = {
            text: 'fais',
            ipa: IPA.F + IPA.SCHWA + IPA.Z,
            rule: Rules.FAIS_VOWEL,
          };
          indexToAdd = 3;
        } else if (nextLetter === 'f') {
          phoneme = {
            text: 'ff',
            ipa: IPA.F,
            rule: Rules.F,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'f',
            ipa: IPA.F,
            rule: Rules.F,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'f',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'v':
        if (nextLetter === 'v') {
          phoneme = {
            text: 'vv',
            ipa: IPA.V,
            rule: Rules.V,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'v',
            ipa: IPA.V,
            rule: Rules.V,
          };
        }
        if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'v',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'n':
        if (nextLetter === 'n') {
          phoneme = {
            text: 'nn',
            ipa: IPA.N,
            rule: Rules.N,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'n',
            ipa: IPA.N,
            rule: Rules.N,
          };
        }
        break;
      case 'm':
        if (nextLetter === 'm') {
          phoneme = {
            text: 'mm',
            ipa: IPA.M,
            rule: Rules.M,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'm',
            ipa: IPA.M,
            rule: Rules.M,
          };
        }
        break;
      case 'l':
        if (nextLetter === 'l') {
          phoneme = {
            text: 'll',
            ipa: IPA.L,
            rule: Rules.L,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'l',
            ipa: IPA.L,
            rule: Rules.L,
          };
        }
        break;
      case 'd':
        if (nextLetter === 'd') {
          phoneme = {
            text: 'd',
            ipa: IPA.D,
            rule: Rules.D,
          };
          indexToAdd = 1;
        } else if (!isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'd',
            ipa: IPA.D,
            rule: Rules.D,
          };
        } else {
          phoneme = {
            text: 'd',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }

        break;

      // VOWELS
      case 'a':
        if (
          isGlideFollowing(
            letter,
            nextLetter,
            nextlettersecond,
            nextletterthird,
            nextletterfourth
          )
        ) {
          phoneme = {
            text: 'a',
            ipa: IPA.BRIGHT_A,
            rule: Rules.SINGLE_A + Notes.GLIDE_FOLLOWING,
          };
        }
        // -aim and -ain nasal
        else if (
          nextLetter === 'i' &&
          (nextlettersecond === 'm' || nextlettersecond === 'n') &&
          isConsonant(nextletterthird) &&
          !isNasalCanceling(nextletterthird)
        ) {
          phoneme = {
            text: 'ai' + nextlettersecond,
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_AIM,
          };
          indexToAdd = 2;
        }
        // -am and -an nasal
        else if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          isConsonant(nextlettersecond) &&
          !isNasalCanceling(nextlettersecond)
        ) {
          phoneme = {
            text: 'a' + nextLetter,
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }
        // final -an nasal
        else if (nextLetter === 'n' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'an',
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }
        // Final -aient verb
        else if (
          nextLetter === 'i' &&
          nextlettersecond === 'e' &&
          nextletterthird === 'n' &&
          nextletterfourth === 't' &&
          isEndOfSentence(nextletterfifth)
        ) {
          phoneme = {
            text: 'aient',
            ipa: IPA.OPEN_E,
            rule: Rules.FINAL_VERB_AIENT,
          };
          indexToAdd = 4;
        } else if (nextLetter === 'i' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ai',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_AI,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'i' || nextLetter === 'î') {
          phoneme = {
            text: 'a' + nextLetter,
            ipa: IPA.OPEN_E,
            rule: Rules.AI,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'y') {
          phoneme = {
            text: 'ay',
            ipa: IPA.OPEN_E + IPA.J_GLIDE,
            rule: Rules.AY,
          };
          indexToAdd = 1;
        } else if (nextLetter === 's' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'as',
            ipa: IPA.BRIGHT_A,
            rule: Rules.FINAL_AS,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'u' && nextlettersecond === 'x') {
          phoneme = {
            text: 'aux',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 2;
        } else if (nextLetter === 'u' && nextlettersecond === 'r') {
          phoneme = {
            text: 'au',
            ipa: IPA.OPEN_O,
            rule: Rules.AUR,
          };
          indexToAdd = 1;
        } else if (nextLetter === 'u') {
          phoneme = {
            text: 'au',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 1;
        } else {
          phoneme = {
            text: 'a',
            ipa: IPA.BRIGHT_A,
            rule: Rules.SINGLE_A,
          };
        }
        break;
      case 'à':
        phoneme = {
          text: 'à',
          ipa: IPA.BRIGHT_A,
          rule: Rules.GRAVE_A,
        };
        break;
      case 'â':
        phoneme = {
          text: 'â',
          ipa: IPA.DARK_A,
          rule: Rules.CIRCUMFLEX_A,
        };
        break;
      case 'e':
        if (
          isConsonant(previousPhoneme) &&
          isConsonant(nextLetter) &&
          isVowel(nextlettersecond)
        ) {
          phoneme = {
            text: 'e',
            ipa: IPA.SCHWA,
            rule: Rules.INTERCONSONANT_SCHWA,
          };
        }
        // FINAL -en(s)
        else if (
          nextLetter === 'n' &&
          (isEndOfSentence(nextlettersecond) ||
            (nextlettersecond === 's' && isEndOfSentence(nextletterthird)))
        ) {
          phoneme = {
            text: 'en' + (nextlettersecond === 's' ? 's' : ''),
            ipa: IPA.NASAL_E,
            rule: Rules.FINAL_ENS,
          };
          nextlettersecond === 's' ? (indexToAdd = 2) : (indexToAdd = 1);
        }
        // -ein nasal
        else if (
          nextLetter === 'i' &&
          nextlettersecond === 'n' &&
          ((isConsonant(nextletterthird) &&
            !isNasalCanceling(nextletterthird)) ||
            isEndOfSentence(nextletterthird))
        ) {
          phoneme = {
            text: 'ein',
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_AIM,
          };
          indexToAdd = 2;
        }
        // -em and -en nasal
        else if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          isConsonant(nextlettersecond) &&
          !isNasalCanceling(nextlettersecond)
        ) {
          phoneme = {
            text: 'e' + nextLetter,
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }
        // ei
        else if (
          nextLetter === 'i' &&
          !isGlideFollowing(
            letter,
            nextLetter,
            nextlettersecond,
            nextletterthird,
            nextletterfourth
          )
        ) {
          phoneme = {
            text: 'ei',
            ipa: IPA.OPEN_E,
            rule: Rules.EI,
          };
          indexToAdd = 1;
        }

        // eu + s + vowel
        else if (
          nextLetter === 'u' &&
          nextlettersecond === 's' &&
          isVowel(nextletterthird)
        ) {
          phoneme = {
            text: 'eu',
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.EU_S_VOWEL,
          };
          indexToAdd = 1;
        }
        // final -eu
        else if (nextLetter === 'u' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'eu',
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU,
          };
          indexToAdd = 1;
        }
        // final verb ending -ent
        else if (
          nextLetter === 'n' &&
          nextlettersecond === 't' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'ent',
            ipa: IPA.SCHWA,
            rule: Rules.FINAL_VERB_ENT,
          };
          indexToAdd = 2;
        }
        // final -eu + final silent consonant
        else if (
          nextLetter === 'u' &&
          nextlettersecond !== 'c' &&
          nextlettersecond !== 'r' &&
          nextlettersecond !== 'f' &&
          nextlettersecond !== 'l' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'eu' + nextlettersecond,
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // eau and eaux
        else if (
          nextLetter === 'a' &&
          nextlettersecond === 'u' &&
          nextletterthird === 'x'
        ) {
          phoneme = {
            text: 'eaux',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 3;
        } else if (nextLetter === 'a' && nextlettersecond === 'u') {
          phoneme = {
            text: 'eau',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 2;
        }
        // eu + pronounced consonant
        else if (
          nextLetter === 'u' &&
          (isPronouncedConsonant(
            nextlettersecond,
            isEndOfSentence(nextletterthird)
          ) ||
            isGlideFollowing(
              nextLetter,
              nextlettersecond,
              nextletterthird,
              nextletterfourth,
              nextletterfifth
            ))
        ) {
          phoneme = {
            text: 'eu',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 1;
        }
        // FINAL -ed(s)
        else if (nextLetter === 'd' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ed',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'd' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'eds',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 2;
        }
        // FINAL -er(s)
        else if (nextLetter === 'r' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'er',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'r' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'ers',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 2;
        }
        // FINAL -ez(s)
        else if (nextLetter === 'z' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ez',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        }
        // FINAL -ec(s)
        else if (nextLetter === 'c' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ec',
            ipa: IPA.OPEN_E + IPA.K,
            rule: Rules.FINAL_EC,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'c' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'ecs',
            ipa: IPA.OPEN_E + IPA.K,
            rule: Rules.FINAL_EC,
          };
          indexToAdd = 2;
        }
        // FINAL -ef(s)
        else if (nextLetter === 'f' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ef',
            ipa: IPA.OPEN_E + IPA.F,
            rule: Rules.FINAL_EF,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'f' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'efs',
            ipa: IPA.OPEN_E + IPA.F,
            rule: Rules.FINAL_EF,
          };
          indexToAdd = 2;
        }
        // FINAL -el(s)
        else if (nextLetter === 'l' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'el',
            ipa: IPA.OPEN_E + IPA.L,
            rule: Rules.FINAL_EL,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'l' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'els',
            ipa: IPA.OPEN_E + IPA.L,
            rule: Rules.FINAL_EL,
          };
          indexToAdd = 2;
        }
        // FINAL -et(s)
        else if (nextLetter === 't' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'et',
            ipa: IPA.OPEN_E,
            rule: Rules.FINAL_ET,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 't' &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'ets',
            ipa: IPA.OPEN_E,
            rule: Rules.FINAL_ET,
          };
          indexToAdd = 2;
        }
        // FINAL -e and -es
        else if (
          isEndOfSentence(nextLetter) ||
          (nextLetter === 's' && isEndOfSentence(nextlettersecond))
        ) {
          phoneme = {
            text: 'e' + (nextLetter === 's' ? 's' : ''),
            ipa: IPA.SCHWA,
            rule: Rules.FINAL_E_ES,
          };
          nextLetter === 's' ? (indexToAdd = 1) : (indexToAdd = 0);
        }
        // e + DOUBLE CONSONANT
        else if (isConsonant(nextLetter) && isConsonant(nextlettersecond)) {
          phoneme = {
            text: 'e',
            ipa: IPA.OPEN_E,
            rule: Rules.SINGLE_E_DOUBLE_CONSONANT,
          };
        } else {
          phoneme = {
            text: 'e',
            ipa: IPA.SCHWA,
            rule: Rules.DEFAULT_E,
          };
        }
        break;

      case 'œ':
        // final -œu + final silent consonant
        if (
          nextLetter === 'u' &&
          nextlettersecond !== 'c' &&
          nextlettersecond !== 'r' &&
          nextlettersecond !== 'f' &&
          nextlettersecond !== 'l' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'œu' + nextlettersecond,
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // œu + pronounced consonant
        else if (
          nextLetter === 'u' &&
          (isPronouncedConsonant(
            nextlettersecond,
            isEndOfSentence(nextletterthird)
          ) ||
            isGlideFollowing(
              letter,
              nextLetter,
              nextlettersecond,
              nextletterthird,
              nextletterfourth
            ))
        ) {
          phoneme = {
            text: 'œu',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'u' &&
          isGlideFollowing(
            nextLetter,
            nextlettersecond,
            nextletterthird,
            nextletterfourth,
            nextletterfifth
          )
        ) {
          phoneme = {
            text: 'œu',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 1;
        }
        // œ + pronounced consonant
        else if (
          isPronouncedConsonant(
            nextlettersecond,
            isEndOfSentence(nextletterthird) ||
              isGlideFollowing(
                letter,
                nextLetter,
                nextlettersecond,
                nextletterthird,
                nextletterfourth
              )
          )
        ) {
          phoneme = {
            text: 'œ',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
        }
        break;
      case 'é':
        phoneme = {
          text: 'é',
          ipa: IPA.CLOSED_E,
          rule: Rules.ACUTE_E,
        };
        break;
      case 'è':
        phoneme = {
          text: 'è',
          ipa: IPA.OPEN_E,
          rule: Rules.ACCENT_E,
        };
        break;
      case 'ê':
        phoneme = {
          text: 'ê',
          ipa: IPA.OPEN_E,
          rule: Rules.ACCENT_E,
        };
        break;
      case 'ë':
        phoneme = {
          text: 'ë',
          ipa: IPA.OPEN_E,
          rule: Rules.ACCENT_E,
        };

        break;
      case 'i':
        // Final -ient verb
        if (
          nextLetter === 'e' &&
          nextlettersecond === 'n' &&
          nextletterthird === 't' &&
          isEndOfSentence(nextletterfourth)
        ) {
          phoneme = {
            text: 'ient',
            ipa: IPA.J_GLIDE + IPA.NASAL_E,
            rule: Rules.FINAL_VERB_IENT,
          };
          indexToAdd = 3;
        }
        // in and im nasal
        else if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          ((isConsonant(nextlettersecond) &&
            !isNasalCanceling(nextlettersecond)) ||
            isEndOfSentence(nextletterfourth))
        ) {
          phoneme = {
            text: 'i' + nextLetter,
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_AIM,
          };
          indexToAdd = 1;
        }

        // Medial ill
        else if (
          !isEndOfSentence(previousPhoneme) &&
          nextLetter === 'l' &&
          nextlettersecond === 'l' &&
          !isEndOfSentence(nextletterthird)
        ) {
          if (isConsonant(previousPhoneme)) {
            phoneme = {
              text: 'ill',
              ipa: IPA.CLOSED_I + IPA.J_GLIDE,
              rule: Rules.MEDIAL_ILL_CONSONANT,
            };
            indexToAdd = 2;
          } else if (isVowel(previousPhoneme)) {
            phoneme = {
              text: 'ill',
              ipa: IPA.J_GLIDE,
              rule: Rules.MEDIAL_ILL_VOWEL,
            };
            indexToAdd = 2;
          }
        }
        // vowel + il
        else if (isVowel(previousPhoneme) && nextLetter === 'l') {
          phoneme = {
            text: 'il',
            ipa: IPA.J_GLIDE,
            rule: Rules.VOWEL_IL,
          };
          indexToAdd = 1;
        }
        // Final -ie
        else if (nextLetter === 'e' && isEndOfSentence(nextlettersecond)) {
          phoneme = {
            text: 'ie',
            ipa: IPA.CLOSED_I,
            rule: Rules.FINAL_IE,
          };
          indexToAdd = 1;
        } else if (isVowel(nextLetter)) {
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

        break;
      case 'î':
        phoneme = {
          text: 'î',
          ipa: IPA.CLOSED_I,
          rule: Rules.ACCENT_I,
        };
        break;
      case 'ï':
        phoneme = {
          text: 'ï',
          ipa: IPA.CLOSED_I,
          rule: Rules.SINGLE_I_OR_Y,
        };
        break;
      case 'y':
        // yn and ym nasal
        if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          ((isConsonant(nextlettersecond) &&
            !isNasalCanceling(nextlettersecond)) ||
            isEndOfSentence(nextletterfourth))
        ) {
          phoneme = {
            text: 'y' + nextLetter,
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_IY,
          };
          indexToAdd = 1;
        } else if (isVowel(nextLetter)) {
          phoneme = {
            text: 'y',
            ipa: IPA.J_GLIDE,
            rule: Rules.IY_VOWEL,
          };
        } else {
          phoneme = {
            text: 'y',
            ipa: IPA.CLOSED_I,
            rule: Rules.SINGLE_I_OR_Y,
          };
        }

        break;
      case 'o':
        // -oin nasal
        if (
          nextLetter === 'i' &&
          nextlettersecond === 'n' &&
          ((isConsonant(nextletterthird) &&
            !isNasalCanceling(nextletterthird)) ||
            isEndOfSentence(nextletterthird))
        ) {
          phoneme = {
            text: 'oin',
            ipa: IPA.W_GLIDE + IPA.NASAL_E,
            rule: Rules.NASAL_ONM_CONSONANT,
          };
          indexToAdd = 2;
        }
        // -om and -on nasal
        else if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          isConsonant(nextlettersecond) &&
          !isNasalCanceling(nextlettersecond)
        ) {
          phoneme = {
            text: 'o' + nextLetter,
            ipa: IPA.NASAL_O,
            rule: Rules.NASAL_ONM_CONSONANT,
          };
          indexToAdd = 1;
        }
        // Final -om and -on nasal
        else if (
          (nextLetter === 'm' || nextLetter === 'n') &&
          isEndOfSentence(nextlettersecond)
        ) {
          phoneme = {
            text: 'o' + nextLetter,
            ipa: IPA.NASAL_O,
            rule: Rules.FINAL_ONM_CONSONANT,
          };
          indexToAdd = 1;
        }
        // final -oeu + final silent consonant
        else if (
          nextLetter === 'e' &&
          nextlettersecond === 'u' &&
          nextletterthird !== 'c' &&
          nextletterthird !== 'r' &&
          nextletterthird !== 'f' &&
          nextletterthird !== 'l' &&
          isEndOfSentence(nextletterfourth)
        ) {
          phoneme = {
            text: 'oeu' + nextletterthird,
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 3;
        }
        // oeu + pronounced consonant
        else if (
          nextLetter === 'e' &&
          nextlettersecond === 'u' &&
          (isPronouncedConsonant(
            nextletterthird,
            isEndOfSentence(nextletterthird)
          ) ||
            isGlideFollowing(
              nextlettersecond,
              nextletterthird,
              nextletterfourth,
              nextletterfifth,
              nextlettersixth
            ))
        ) {
          phoneme = {
            text: 'oeu',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 2;
        }
        // oe + pronounced consonant
        else if (
          nextLetter === 'e' &&
          (isPronouncedConsonant(
            nextlettersecond,
            isEndOfSentence(nextletterthird)
          ) ||
            isGlideFollowing(
              nextLetter,
              nextlettersecond,
              nextletterthird,
              nextletterfourth,
              nextletterfifth
            ))
        ) {
          phoneme = {
            text: 'oe',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 1;
        }
        // ou + vowel
        else if (
          nextLetter === 'u' &&
          isVowel(nextlettersecond) &&
          !(
            (nextlettersecond === 'e' && isEndOfSentence(nextletterthird)) ||
            (nextlettersecond === 'e' &&
              nextletterthird === 's' &&
              isEndOfSentence(nextletterfourth))
          )
        ) {
          phoneme = {
            text: 'ou',
            ipa: IPA.W_GLIDE,
            rule: Rules.OU_VOWEL,
          };
          indexToAdd = 1;
        }
        // o + tion
        else if (
          nextLetter + nextlettersecond + nextletterthird + nextletterfourth ===
          'tion'
        ) {
          phoneme = {
            text: 'o',
            ipa: IPA.CLOSED_O,
            rule: Rules.O_TION,
          };
        }
        // Spelling 'oi'
        else if (nextLetter === 'i') {
          phoneme = {
            text: 'oi',
            ipa: IPA.W_GLIDE + IPA.BRIGHT_A,
            rule: Rules.OI,
          };
          indexToAdd = 1;
        }
        // Spelling 'oy'
        else if (nextLetter === 'y') {
          phoneme = {
            text: 'oy',
            ipa: IPA.W_GLIDE + IPA.BRIGHT_A + IPA.J_GLIDE,
            rule: Rules.OY,
          };
          indexToAdd = 1;
        }
        // If next sound is [z]
        else if (nextLetter === 's' && isVowel(nextlettersecond)) {
          phoneme = {
            text: 'o',
            ipa: IPA.CLOSED_O,
            rule: Rules.O_Z_SOUND,
          };
        }
        // o + final silent consonant
        else if (
          isConsonant(nextLetter) &&
          isEndOfSentence(nextlettersecond) &&
          nextLetter !== 'c' &&
          nextLetter !== 'r' &&
          nextLetter !== 'f' &&
          nextLetter !== 'l'
        ) {
          phoneme = {
            text: 'o' + nextLetter,
            ipa: IPA.CLOSED_O,
            rule: Rules.FINAL_O_SILENTCONSONANT,
          };
          indexToAdd = 1;
        }
        // o + final silent consonant + s
        // o + final silent consonant
        else if (
          isConsonant(nextLetter) &&
          nextlettersecond === 's' &&
          isEndOfSentence(nextletterthird) &&
          nextLetter !== 'c' &&
          nextLetter !== 'r' &&
          nextLetter !== 'f' &&
          nextLetter !== 'l'
        ) {
          phoneme = {
            text: 'o' + nextLetter + 's',
            ipa: IPA.CLOSED_O,
            rule: Rules.FINAL_O_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // ou
        else if (nextLetter === 'u') {
          phoneme = {
            text: 'ou',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // où
        else if (nextLetter === 'ù') {
          phoneme = {
            text: 'où',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // oû
        else if (nextLetter === 'û') {
          phoneme = {
            text: 'oû',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // If followed by pronounced consonant
        else if (isConsonant(nextLetter) && nextLetter !== 'h') {
          phoneme = {
            text: 'o',
            ipa: IPA.OPEN_O,
            rule: Rules.SINGLE_O_PRONOUNCED_CONSONANT,
          };
        }
        break;
      case 'ô':
        phoneme = {
          text: 'ô',
          ipa: IPA.CLOSED_O,
          rule: Rules.ACCENT_O,
        };
        break;
      case 'u':
        // Nasal um and un
        if (
          (nextLetter === 'n' || nextLetter === 'm') &&
          ((isConsonant(nextlettersecond) &&
            !isNasalCanceling(nextlettersecond)) ||
            isEndOfSentence(nextlettersecond))
        ) {
          phoneme = {
            text: 'u' + nextLetter,
            ipa: IPA.NASAL_MIXED_O,
            rule: Rules.NASAL_UMN,
          };
          indexToAdd = 1;
        } else if (
          nextLetter === 'e' &&
          !isEndOfSentence(previousPhoneme) &&
          !isEndOfSentence(nextlettersecond)
        ) {
          phoneme = {
            text: 'ue',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.MEDIAL_UE,
          };
          indexToAdd = 1;
        } else if (
          isVowel(nextLetter) &&
          !isGlideFollowing(
            letter,
            nextLetter,
            nextlettersecond,
            nextletterthird,
            nextletterfourth
          )
        ) {
          phoneme = {
            text: 'u',
            ipa: IPA.Y_GLIDE,
            rule: Rules.U_VOWEL,
          };
        } else {
          phoneme = {
            text: 'u',
            ipa: IPA.CLOSED_Y,
            rule: Rules.SINGLE_U,
          };
        }

        break;
      case 'û':
        phoneme = {
          text: 'û',
          ipa: IPA.CLOSED_Y,
          rule: Rules.ACCENT_U,
        };
        break;

      // PUNCTUATION
      case ',':
      case ';':
      case '!':
      case '.':
      case '?':
      case '(':
      case ')':
      case '-':
        phoneme = {
          text: letter,
          ipa: letter,
          rule: Rules.NONE,
        };
        break;
      case "'":
      case '’':
        phoneme = {
          text: letter,
          ipa: '',
          rule: Rules.NONE,
        };
        break;
      case ' ':
        result.lines[result.lines.length - 1].words.push({
          syllables: [],
        });
        startOfNewWord = true;
        break;
      case '\n':
        result.lines.push({
          words: [
            {
              syllables: [],
            },
          ],
        });
        startOfNewWord = true;
        break;
    }

    // Check for exceptions
    if (startOfNewWord) {
      const [word, newIndex] = getNextWord(index, charArray);
      const wordNoPunctuation = getCharArray(word)
        .filter(char => !isPunctuation(char))
        .join('');

      if (wordNoPunctuation in Exceptions) {
        phoneme = {
          ...Exceptions[wordNoPunctuation],
          text: word,
        };
        index = newIndex;
      }
    }
    startOfNewWord = false;

    index += indexToAdd;

    const currentLine = result.lines[result.lines.length - 1];
    const currentWord = currentLine.words[currentLine.words.length - 1];

    // Analize final IPA syllable
    // ex. Final open e is more closed
    const previousSyllable =
      currentWord.syllables[currentWord.syllables.length - 1];
    if (previousSyllable && isEndOfSentence(nextLetter)) {
      const previousIPA = previousSyllable.ipa[previousSyllable.ipa.length - 1];
      if (previousIPA) {
        if (previousIPA === IPA.OPEN_E) {
          previousSyllable.rule += Notes.FINAL_E_HALFCLOSED;
        }
      }
    } else if (isEndOfSentence(nextLetter)) {
      if (phoneme.ipa[phoneme.ipa.length - 1]) {
        if (phoneme.ipa[phoneme.ipa.length - 1] === IPA.OPEN_E) {
          phoneme.rule += Notes.FINAL_E_HALFCLOSED;
        }
      }
    }

    currentWord.syllables.push(phoneme);
    if (!isConsonant(phoneme.text)) {
      previousPhoneme = phoneme.ipa[phoneme.ipa.length - 1];
    }

    // Analyze vocalic harmonization
    if (
      isEndOfSentence(nextLetter) ||
      (indexToAdd === 1 && isEndOfSentence(nextlettersecond)) ||
      (indexToAdd === 2 && isEndOfSentence(nextletterthird)) ||
      (indexToAdd === 3 && isEndOfSentence(nextletterfourth))
    ) {
      let closedFrontVowelFound = false;
      let closedMixedVowelFound = false;
      for (let j = currentWord.syllables.length - 1; j >= 0; j--) {
        const currentIPA = currentWord.syllables[j];
        for (let k = currentIPA.ipa.length - 1; k >= 0; k--) {
          const symbol = currentIPA.ipa[k];
          if (
            symbol === IPA.CLOSED_E ||
            symbol === IPA.CLOSED_I ||
            symbol === IPA.CLOSED_Y
          ) {
            closedFrontVowelFound = true;
          } else if (symbol === IPA.CLOSED_MIXED_O) {
            closedMixedVowelFound = true;
          }

          if (closedFrontVowelFound) {
            if (
              symbol === IPA.OPEN_E &&
              (currentIPA.text === 'ai' ||
                currentIPA.text === 'aî' ||
                currentIPA.text === 'ay' ||
                currentIPA.text === 'ei' ||
                currentIPA.text === 'ê')
            ) {
              currentWord.syllables[j] = {
                ...currentWord.syllables[j],
                ipa: `(${IPA.CLOSED_E})`,
                rule: Rules.VOCALIC_HARMONIZATION_E,
              };
            }
          } else if (closedMixedVowelFound) {
            if (symbol === IPA.OPEN_MIXED_O) {
              currentWord.syllables[j] = {
                ...currentWord.syllables[j],
                ipa: `(${IPA.CLOSED_MIXED_O})`,
                rule: Rules.VOCALIC_HARMONIZATION_E,
              };
            }
          }
        }
      }
    }
  }
  return result;
};

export default parseFrench;
