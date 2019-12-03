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
import Template from '../../constants/Template';
import parseB from './parse-letters/parseB';
import parseC from './parse-letters/parseC';
import parseF from './parse-letters/parseF';
import parseG from './parse-letters/parseG';
import parseH from './parse-letters/parseH';
import parseJ from './parse-letters/parseJ';
import parseL from './parse-letters/parseL';
import parseM from './parse-letters/parseM';
import parseN from './parse-letters/parseN';
import parseP from './parse-letters/parseP';
import parseQ from './parse-letters/parseQ';
import parseR from './parse-letters/parseR';
import parseS from './parse-letters/parseS';
import parseT from './parse-letters/parseT';
import parseV from './parse-letters/parseV';
import parseX from './parse-letters/parseX';
import parseZ from './parse-letters/parseZ';
import parseD from './parse-letters/parseD';

const parseFrench = (
  text: string,
  shouldAnalyzeElision?: boolean,
  shouldAnalyzeLiason?: boolean
) => {
  if (shouldAnalyzeElision === undefined) shouldAnalyzeElision = true;
  if (shouldAnalyzeLiason === undefined) shouldAnalyzeLiason = true;
  const charArray = getCharArray(text);

  let result: Result = Template.getResultTemplate();

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

    /*
      Index 0 is the current letter,
      and every other index is index
      letters away from the current
      letter.
    */
    let nextletter = [
      charArray[index],
      charArray[index + 1],
      charArray[index + 2],
      charArray[index + 3],
      charArray[index + 4],
      charArray[index + 5],
      charArray[index + 6],
      charArray[index + 7],
      charArray[index + 8],
      charArray[index + 9],
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
      case 'b':
        phoneme = parseB(parseProps);
        break;
      case 'c':
      case 'ç':
        phoneme = parseC(parseProps);
        break;
      case 'd':
        phoneme = parseD(parseProps);
        break;
      case 'f':
        phoneme = parseF(parseProps);
        break;
      case 'g':
        phoneme = parseG(parseProps);
        break;
      case 'h':
        phoneme = parseH(parseProps);
        break;
      case 'j':
        phoneme = parseJ(parseProps);
        break;
      case 'l':
        phoneme = parseL(parseProps);
        break;
      case 'm':
        phoneme = parseM(parseProps);
        break;
      case 'n':
        phoneme = parseN(parseProps);
        break;
      case 'p':
        phoneme = parseP(parseProps);
        break;
      case 'q':
        phoneme = parseQ(parseProps);
        break;
      case 'r':
        phoneme = parseR(parseProps);
        break;
      case 's':
        phoneme = parseS(parseProps);
        break;
      case 't':
        phoneme = parseT(parseProps);
        break;
      case 'v':
        phoneme = parseV(parseProps);
        break;
      case 'x':
        phoneme = parseX(parseProps);
        break;
      case 'z':
        phoneme = parseZ(parseProps);
        break;

      // VOWELS
      case 'a':
        // -aim and -ain nasal
        if (
          nextletter[1] === 'i' &&
          (nextletter[2] === 'm' || nextletter[2] === 'n') &&
          ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
            isEndOfSentence(nextletter[3]))
        ) {
          phoneme = {
            text: 'ai' + nextletter[2],
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_AIM,
          };
          indexToAdd = 2;
        }
        // -am and -an nasal
        else if (
          (nextletter[1] === 'm' || nextletter[1] === 'n') &&
          isConsonant(nextletter[2]) &&
          !isNasalCanceling(nextletter[2])
        ) {
          phoneme = {
            text: 'a' + nextletter[1],
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }
        // final -an nasal
        else if (nextletter[1] === 'n' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'an',
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }

        // Final -aient verb
        else if (
          nextletter[1] === 'i' &&
          nextletter[2] === 'e' &&
          nextletter[3] === 'n' &&
          nextletter[4] === 't' &&
          isEndOfSentence(nextletter[5])
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
            nextletter[1],
            nextletter[2],
            nextletter[3],
            nextletter[4]
          )
        ) {
          phoneme = {
            text: 'a',
            ipa: IPA.BRIGHT_A,
            rule: Rules.SINGLE_A + Notes.GLIDE_FOLLOWING,
          };
        } else if (nextletter[1] === 'i' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ai',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_AI,
          };
          indexToAdd = 1;
        } else if (nextletter[1] === 'i' || nextletter[1] === 'î') {
          phoneme = {
            text: 'a' + nextletter[1],
            ipa: IPA.OPEN_E,
            rule: Rules.AI,
          };
          indexToAdd = 1;
        } else if (nextletter[1] === 'y') {
          phoneme = {
            text: 'ay',
            ipa: IPA.OPEN_E + IPA.J_GLIDE,
            rule: Rules.AY,
          };
          indexToAdd = 1;
        } else if (nextletter[1] === 's' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'as',
            ipa: IPA.BRIGHT_A,
            rule: Rules.FINAL_AS,
          };
          indexToAdd = 1;
        } else if (nextletter[1] === 'u' && nextletter[2] === 'x') {
          phoneme = {
            text: 'aux',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 2;
        } else if (nextletter[1] === 'u' && nextletter[2] === 'r') {
          phoneme = {
            text: 'au',
            ipa: IPA.OPEN_O,
            rule: Rules.AUR,
          };
          indexToAdd = 1;
        } else if (nextletter[1] === 'u') {
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
          isConsonant(nextletter[1]) &&
          isVowel(nextletter[2])
        ) {
          phoneme = {
            text: 'e',
            ipa: IPA.SCHWA,
            rule: Rules.INTERCONSONANT_SCHWA,
          };
        }
        // FINAL -ent
        else if (
          nextletter[1] === 'n' &&
          nextletter[2] === 't' &&
          isEndOfSentence(nextletter[3])
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
          nextletter[1] === 'n' &&
          (isEndOfSentence(nextletter[2]) ||
            (nextletter[2] === 's' && isEndOfSentence(nextletter[3])))
        ) {
          phoneme = {
            text: 'en' + (nextletter[2] === 's' ? 's' : ''),
            ipa: IPA.NASAL_E,
            rule: Rules.FINAL_ENS,
          };
          nextletter[2] === 's' ? (indexToAdd = 2) : (indexToAdd = 1);
        }
        // -ein nasal
        else if (
          nextletter[1] === 'i' &&
          nextletter[2] === 'n' &&
          ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
            isEndOfSentence(nextletter[3]))
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
          (nextletter[1] === 'm' || nextletter[1] === 'n') &&
          isConsonant(nextletter[2]) &&
          !isNasalCanceling(nextletter[2])
        ) {
          phoneme = {
            text: 'e' + nextletter[1],
            ipa: IPA.NASAL_A,
            rule: Rules.NASAL_EAMN_CONSONANT,
          };
          indexToAdd = 1;
        }
        // ei
        else if (
          nextletter[1] === 'i' &&
          !isGlideFollowing(
            letter,
            nextletter[1],
            nextletter[2],
            nextletter[3],
            nextletter[4]
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
          nextletter[1] === 'u' &&
          nextletter[2] === 's' &&
          isVowel(nextletter[3])
        ) {
          phoneme = {
            text: 'eu',
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.EU_S_VOWEL,
          };
          indexToAdd = 1;
        }
        // final -eu
        else if (nextletter[1] === 'u' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'eu',
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU,
          };
          indexToAdd = 1;
        }
        // final verb ending -ent
        else if (
          nextletter[1] === 'n' &&
          nextletter[2] === 't' &&
          isEndOfSentence(nextletter[3])
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
          nextletter[1] === 'u' &&
          nextletter[2] !== 'c' &&
          nextletter[2] !== 'r' &&
          nextletter[2] !== 'f' &&
          nextletter[2] !== 'l' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'eu' + nextletter[2],
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // eau and eaux
        else if (
          nextletter[1] === 'a' &&
          nextletter[2] === 'u' &&
          nextletter[3] === 'x'
        ) {
          phoneme = {
            text: 'eaux',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 3;
        } else if (nextletter[1] === 'a' && nextletter[2] === 'u') {
          phoneme = {
            text: 'eau',
            ipa: IPA.CLOSED_O,
            rule: Rules.AU_EAU,
          };
          indexToAdd = 2;
        }
        // eu + pronounced consonant
        else if (
          nextletter[1] === 'u' &&
          (isPronouncedConsonant(
            nextletter[2],
            isEndOfSentence(nextletter[3])
          ) ||
            isGlideFollowing(
              nextletter[1],
              nextletter[2],
              nextletter[3],
              nextletter[4],
              nextletter[5]
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
        else if (nextletter[1] === 'd' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ed',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'd' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'eds',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 2;
        }
        // FINAL -er(s)
        else if (nextletter[1] === 'r' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'er',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'r' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'ers',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 2;
        }
        // FINAL -ez(s)
        else if (nextletter[1] === 'z' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ez',
            ipa: IPA.CLOSED_E,
            rule: Rules.FINAL_E_DRZ,
          };
          indexToAdd = 1;
        }
        // FINAL -ec(s)
        else if (nextletter[1] === 'c' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ec',
            ipa: IPA.OPEN_E + IPA.K,
            rule: Rules.FINAL_EC,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'c' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'ecs',
            ipa: IPA.OPEN_E + IPA.K,
            rule: Rules.FINAL_EC,
          };
          indexToAdd = 2;
        }
        // FINAL -ef(s)
        else if (nextletter[1] === 'f' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ef',
            ipa: IPA.OPEN_E + IPA.F,
            rule: Rules.FINAL_EF,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'f' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'efs',
            ipa: IPA.OPEN_E + IPA.F,
            rule: Rules.FINAL_EF,
          };
          indexToAdd = 2;
        }
        // FINAL -el(s)
        else if (nextletter[1] === 'l' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'el',
            ipa: IPA.OPEN_E + IPA.L,
            rule: Rules.FINAL_EL,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'l' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'els',
            ipa: IPA.OPEN_E + IPA.L,
            rule: Rules.FINAL_EL,
          };
          indexToAdd = 2;
        }
        // FINAL -et(s)
        else if (nextletter[1] === 't' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'et',
            ipa: IPA.OPEN_E,
            rule: Rules.FINAL_ET,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 't' &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3])
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
          isEndOfSentence(nextletter[1]) ||
          (nextletter[1] === 's' && isEndOfSentence(nextletter[2]))
        ) {
          phoneme = {
            text: 'e' + (nextletter[1] === 's' ? 's' : ''),
            ipa: IPA.SCHWA,
            rule: Rules.FINAL_E_ES,
          };
          nextletter[1] === 's' ? (indexToAdd = 1) : (indexToAdd = 0);
        }
        // e + DOUBLE CONSONANT
        else if (isConsonant(nextletter[1]) && isConsonant(nextletter[2])) {
          phoneme = {
            text: 'e',
            ipa: IPA.OPEN_E,
            rule: Rules.SINGLE_E_DOUBLE_CONSONANT,
          };
        } else {
          phoneme = {
            text: 'e',
            ipa: IPA.OPEN_E,
            rule: Rules.DEFAULT_E,
          };
        }
        break;

      case 'œ':
        // final -œu + final silent consonant
        if (
          nextletter[1] === 'u' &&
          nextletter[2] !== 'c' &&
          nextletter[2] !== 'r' &&
          nextletter[2] !== 'f' &&
          nextletter[2] !== 'l' &&
          isEndOfSentence(nextletter[3])
        ) {
          phoneme = {
            text: 'œu' + nextletter[2],
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // œu + pronounced consonant
        else if (
          nextletter[1] === 'u' &&
          (isPronouncedConsonant(
            nextletter[2],
            isEndOfSentence(nextletter[3])
          ) ||
            isGlideFollowing(
              letter,
              nextletter[1],
              nextletter[2],
              nextletter[3],
              nextletter[4]
            ))
        ) {
          phoneme = {
            text: 'œu',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.EU_PRONOUNCEDCONSONSANT,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'u' &&
          isGlideFollowing(
            nextletter[1],
            nextletter[2],
            nextletter[3],
            nextletter[4],
            nextletter[5]
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
            nextletter[2],
            isEndOfSentence(nextletter[3]) ||
              isGlideFollowing(
                letter,
                nextletter[1],
                nextletter[2],
                nextletter[3],
                nextletter[4]
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
          indexToAdd = 2;
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
          indexToAdd = 3;
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
          indexToAdd = 1;
        }

        // Medial ill
        else if (
          !isEndOfSentence(previousPhoneme) &&
          nextletter[1] === 'l' &&
          nextletter[2] === 'l' &&
          !isEndOfSentence(nextletter[3])
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
        else if (isVowel(previousPhoneme) && nextletter[1] === 'l') {
          phoneme = {
            text: 'il',
            ipa: IPA.J_GLIDE,
            rule: Rules.VOWEL_IL,
          };
          indexToAdd = 1;
        }
        // Final -ie
        else if (nextletter[1] === 'e' && isEndOfSentence(nextletter[2])) {
          phoneme = {
            text: 'ie',
            ipa: IPA.CLOSED_I,
            rule: Rules.FINAL_IE,
          };
          indexToAdd = 1;
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
          (nextletter[1] === 'm' || nextletter[1] === 'n') &&
          ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
            isEndOfSentence(nextletter[4]))
        ) {
          phoneme = {
            text: 'y' + nextletter[1],
            ipa: IPA.NASAL_E,
            rule: Rules.NASAL_IY,
          };
          indexToAdd = 1;
        } else if (isVowel(nextletter[1])) {
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
          nextletter[1] === 'i' &&
          nextletter[2] === 'n' &&
          ((isConsonant(nextletter[3]) && !isNasalCanceling(nextletter[3])) ||
            isEndOfSentence(nextletter[3]))
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
          (nextletter[1] === 'm' || nextletter[1] === 'n') &&
          isConsonant(nextletter[2]) &&
          !isNasalCanceling(nextletter[2])
        ) {
          phoneme = {
            text: 'o' + nextletter[1],
            ipa: IPA.NASAL_O,
            rule: Rules.NASAL_ONM_CONSONANT,
          };
          indexToAdd = 1;
        }
        // Final -om and -on nasal
        else if (
          (nextletter[1] === 'm' || nextletter[1] === 'n') &&
          isEndOfSentence(nextletter[2])
        ) {
          phoneme = {
            text: 'o' + nextletter[1],
            ipa: IPA.NASAL_O,
            rule: Rules.FINAL_ONM_CONSONANT,
          };
          indexToAdd = 1;
        }
        // final -oeu + final silent consonant
        else if (
          nextletter[1] === 'e' &&
          nextletter[2] === 'u' &&
          nextletter[3] !== 'c' &&
          nextletter[3] !== 'r' &&
          nextletter[3] !== 'f' &&
          nextletter[3] !== 'l' &&
          isEndOfSentence(nextletter[4])
        ) {
          phoneme = {
            text: 'oeu' + nextletter[3],
            ipa: IPA.CLOSED_MIXED_O,
            rule: Rules.FINAL_EU_SILENTCONSONANT,
          };
          indexToAdd = 3;
        }
        // oeu + pronounced consonant
        else if (
          nextletter[1] === 'e' &&
          nextletter[2] === 'u' &&
          (isPronouncedConsonant(
            nextletter[3],
            isEndOfSentence(nextletter[3])
          ) ||
            isGlideFollowing(
              nextletter[2],
              nextletter[3],
              nextletter[4],
              nextletter[5],
              nextletter[6]
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
          nextletter[1] === 'e' &&
          (isPronouncedConsonant(
            nextletter[2],
            isEndOfSentence(nextletter[3])
          ) ||
            isGlideFollowing(
              nextletter[1],
              nextletter[2],
              nextletter[3],
              nextletter[4],
              nextletter[5]
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
          nextletter[1] === 'u' &&
          isVowel(nextletter[2]) &&
          !(
            (nextletter[2] === 'e' && isEndOfSentence(nextletter[3])) ||
            (nextletter[2] === 'e' &&
              nextletter[3] === 's' &&
              isEndOfSentence(nextletter[4]))
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
          nextletter[1] + nextletter[2] + nextletter[3] + nextletter[4] ===
          'tion'
        ) {
          phoneme = {
            text: 'o',
            ipa: IPA.CLOSED_O,
            rule: Rules.O_TION,
          };
        }
        // Spelling 'oi'
        else if (nextletter[1] === 'i') {
          phoneme = {
            text: 'oi',
            ipa: IPA.W_GLIDE + IPA.BRIGHT_A,
            rule: Rules.OI,
          };
          indexToAdd = 1;
        }
        // Spelling 'oy'
        else if (nextletter[1] === 'y') {
          phoneme = {
            text: 'oy',
            ipa: IPA.W_GLIDE + IPA.BRIGHT_A + IPA.J_GLIDE,
            rule: Rules.OY,
          };
          indexToAdd = 1;
        }
        // If next sound is [z]
        else if (nextletter[1] === 's' && isVowel(nextletter[2])) {
          phoneme = {
            text: 'o',
            ipa: IPA.CLOSED_O,
            rule: Rules.O_Z_SOUND,
          };
        }
        // o + final silent consonant
        else if (
          isConsonant(nextletter[1]) &&
          isEndOfSentence(nextletter[2]) &&
          nextletter[1] !== 'c' &&
          nextletter[1] !== 'r' &&
          nextletter[1] !== 'f' &&
          nextletter[1] !== 'l'
        ) {
          phoneme = {
            text: 'o' + nextletter[1],
            ipa: IPA.CLOSED_O,
            rule: Rules.FINAL_O_SILENTCONSONANT,
          };
          indexToAdd = 1;
        }
        // o + final silent consonant + s
        // o + final silent consonant
        else if (
          isConsonant(nextletter[1]) &&
          nextletter[2] === 's' &&
          isEndOfSentence(nextletter[3]) &&
          nextletter[1] !== 'c' &&
          nextletter[1] !== 'r' &&
          nextletter[1] !== 'f' &&
          nextletter[1] !== 'l'
        ) {
          phoneme = {
            text: 'o' + nextletter[1] + 's',
            ipa: IPA.CLOSED_O,
            rule: Rules.FINAL_O_SILENTCONSONANT,
          };
          indexToAdd = 2;
        }
        // ou
        else if (nextletter[1] === 'u') {
          phoneme = {
            text: 'ou',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // où
        else if (nextletter[1] === 'ù') {
          phoneme = {
            text: 'où',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // oû
        else if (nextletter[1] === 'û') {
          phoneme = {
            text: 'oû',
            ipa: IPA.CLOSED_U,
            rule: Rules.OU,
          };
          indexToAdd = 1;
        }
        // If followed by pronounced consonant
        else if (isConsonant(nextletter[1]) && nextletter[1] !== 'h') {
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
          (nextletter[1] === 'n' || nextletter[1] === 'm') &&
          ((isConsonant(nextletter[2]) && !isNasalCanceling(nextletter[2])) ||
            isEndOfSentence(nextletter[2]))
        ) {
          phoneme = {
            text: 'u' + nextletter[1],
            ipa: IPA.NASAL_MIXED_O,
            rule: Rules.NASAL_UMN,
          };
          indexToAdd = 1;
        } else if (
          nextletter[1] === 'e' &&
          !isEndOfSentence(previousPhoneme) &&
          !isEndOfSentence(nextletter[2])
        ) {
          phoneme = {
            text: 'ue',
            ipa: IPA.OPEN_MIXED_O,
            rule: Rules.MEDIAL_UE,
          };
          indexToAdd = 1;
        } else if (
          isVowel(nextletter[1]) &&
          !isGlideFollowing(
            letter,
            nextletter[1],
            nextletter[2],
            nextletter[3],
            nextletter[4]
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
    indexToAdd = phoneme.text.length - 1;

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
        isEndOfSentence(nextletter[1]) &&
        isVowel(nextletter[2])
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
        isEndOfSentence(nextletter[1]) &&
        isVowel(nextletter[2])
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
      isEndOfSentence(nextletter[1]) ||
      (indexToAdd === 1 && isEndOfSentence(nextletter[2])) ||
      (indexToAdd === 2 && isEndOfSentence(nextletter[3])) ||
      (indexToAdd === 3 && isEndOfSentence(nextletter[4]))
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
