import {
  getCharArray,
  isConsonant,
  isVowel,
  getNextWord,
  isPunctuation,
  isEndOfSentence,
} from '../../util/Helper';
import IPA from '../../constants/IPA';
import { Result, Phoneme, ParseLetterProps } from '../../constants/Interfaces';
import Rules from './FrenchRules';
import Exceptions from './FrenchExceptions';
import Notes from './FrenchNotes';
import {
  isPronouncedConsonant,
  isGlideFollowing,
  isNasalCanceling,
  areNoMorePronouncedConsonants,
} from './FrenchHelper';
import parseC from './parse-letters/parseC';
import parseG from './parse-letters/parseG';
import parseH from './parse-letters/parseH';
import parseJ from './parse-letters/parseJ';
import parseQ from './parse-letters/parseQ';
import parseR from './parse-letters/parseR';
import parseS from './parse-letters/parseS';
import parseZ from './parse-letters/parseR';

const parseFrench = (
  text: string,
  shouldAnalyzeElision?: boolean,
  shouldAnalyzeLiason?: boolean
) => {
  if (shouldAnalyzeElision === undefined) shouldAnalyzeElision = true;
  if (shouldAnalyzeLiason === undefined) shouldAnalyzeLiason = true;
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
      nextlettersixth = charArray[index + 6];
    }

    let nextletter = [
      charArray[index],
      charArray[index + 1],
      charArray[index + 2],
      charArray[index + 3],
      charArray[index + 4],
      charArray[index + 5],
      charArray[index + 6],
    ];

    const parseProps: ParseLetterProps = {
      phoneme,
      index,
      indexToAdd,
      charArray,
      nextletter,
      previousIPA: previousPhoneme,
    };

    switch (letter) {
      // CONSONANTS
      case 'c':
      case 'ç':
        [phoneme, indexToAdd] = parseC(parseProps);
        break;
      case 'g':
        [phoneme, indexToAdd] = parseG(parseProps);
        break;
      case 'h':
        [phoneme, indexToAdd] = parseH(parseProps);
        break;
      case 'j':
        [phoneme, indexToAdd] = parseJ(parseProps);
        break;
      case 'q':
        [phoneme, indexToAdd] = parseQ(parseProps);
        break;
      case 'r':
        [phoneme, indexToAdd] = parseR(parseProps);
        break;
      case 'z':
        [phoneme, indexToAdd] = parseZ(parseProps);
        break;
      case 's':
        [phoneme, indexToAdd] = parseS(parseProps);
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
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
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
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (isEndOfSentence(nextLetter)) {
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
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'p',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
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

        break;
      case 'b':
        if (nextLetter === 's' || nextLetter === 't') {
          phoneme = {
            text: 'b',
            ipa: IPA.P,
            rule: Rules.B_ST,
          };
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'b',
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
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
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
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
        } else if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        }
        break;
      case 'n':
        if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (nextLetter === 'n') {
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
        if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (nextLetter === 'm') {
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
        if (areNoMorePronouncedConsonants(charArray, index)) {
          phoneme = {
            text: letter,
            ipa: '',
            rule: Rules.SILENT_FINAL_CONSONANT,
          };
        } else if (!isEndOfSentence(nextLetter)) {
          phoneme = {
            text: 'd',
            ipa: IPA.D,
            rule: Rules.D,
          };
        } else if (nextLetter === 'd') {
          phoneme = {
            text: 'dd',
            ipa: IPA.D,
            rule: Rules.D,
          };
          indexToAdd = 1;
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
        // -aim and -ain nasal
        if (
          nextLetter === 'i' &&
          (nextlettersecond === 'm' || nextlettersecond === 'n') &&
          ((isConsonant(nextletterthird) &&
            !isNasalCanceling(nextletterthird)) ||
            isEndOfSentence(nextletterthird))
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
        } else if (
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
        // FINAL -ent
        else if (
          nextLetter === 'n' &&
          nextlettersecond === 't' &&
          isEndOfSentence(nextletterthird)
        ) {
          phoneme = {
            text: 'ent',
            ipa: IPA.SCHWA,
            rule: Rules.FINAL_ENT,
          };
          indexToAdd = 2;
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
        // Initial -ill, -irr, -inn, -mm
        if (
          nextLetter + nextlettersecond === 'll' ||
          nextLetter + nextlettersecond === 'rr' ||
          nextLetter + nextlettersecond === 'nn' ||
          nextLetter + nextlettersecond === 'mm'
        ) {
          phoneme = {
            text: 'i' + nextLetter + nextlettersecond,
            ipa: IPA.CLOSED_I + nextLetter + nextlettersecond,
            rule: Rules.INITIAL_ILRNM,
          };
          indexToAdd = 2;
        }
        // Final -ient verb
        else if (
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
        startOfNewWord = true;
        break;
      case "'":
      case '’':
        phoneme = {
          text: letter,
          ipa: '',
          rule: Rules.NONE,
        };
        startOfNewWord = true;
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

    const currentLine = result.lines[result.lines.length - 1];
    const currentWord = currentLine.words[currentLine.words.length - 1];

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

        const precedingCharacter = charArray[index];
        const hasPrecedingPunctuation = isPunctuation(precedingCharacter);
        if (hasPrecedingPunctuation) {
          currentWord.syllables.push({
            text: precedingCharacter,
            ipa: '',
            rule: Rules.NONE,
          });
        }

        index = newIndex;
      }
    }
    startOfNewWord = false;

    index += indexToAdd;

    // Analyze Elision
    if (shouldAnalyzeElision) {
      if (
        phoneme.ipa === IPA.SCHWA &&
        isEndOfSentence(nextLetter) &&
        isVowel(nextlettersecond)
      ) {
        phoneme = {
          ...phoneme,
          ipa: '',
          rule: Rules.ELISION,
        };
      }
    }

    // Analyze Liason
    if (shouldAnalyzeLiason) {
      const lastCharacter = phoneme.text[phoneme.text.length - 1];
      const nextCharacter = charArray[index + indexToAdd];
      const nextCharacterSecond = charArray[index + indexToAdd + 1];
      if (
        !isPronouncedConsonant(lastCharacter, true) &&
        isConsonant(lastCharacter) &&
        isEndOfSentence(nextCharacter) &&
        isVowel(nextCharacterSecond)
      ) {
        phoneme = {
          text: phoneme.text,
          ipa: phoneme.ipa + lastCharacter,
          rule: phoneme.rule + Notes.LIASON,
        };
      } else if (
        lastCharacter === 's' &&
        isEndOfSentence(nextLetter) &&
        isVowel(nextlettersecond)
      ) {
        phoneme = {
          text: phoneme.text,
          ipa: phoneme.ipa + IPA.Z,
          rule: Rules.S_LIASON,
        };
      }
    }

    currentWord.syllables.push(phoneme);
    previousPhoneme = phoneme.ipa[phoneme.ipa.length - 1];

    // Analize final IPA syllable
    // ex. Final open e is more closed
    if (phoneme.text !== 'est' && phoneme.text !== 'es') {
      let previousSyllable =
        currentWord.syllables[currentWord.syllables.length - 1];
      if (previousSyllable.ipa.length === 0) {
        if (currentWord.syllables[currentWord.syllables.length - 2]) {
          previousSyllable =
            currentWord.syllables[currentWord.syllables.length - 2];
        }
      }
      if (previousSyllable && isEndOfSentence(charArray[index + 1])) {
        const previousIPA =
          previousSyllable.ipa[previousSyllable.ipa.length - 1];
        if (previousIPA) {
          if (previousIPA === IPA.OPEN_E) {
            previousSyllable.ipa = IPA.CLOSED_E;
            previousSyllable.rule += Notes.FINAL_E_HALFCLOSED;
          }
        }
      }
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
