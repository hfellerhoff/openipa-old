import {
  ParseLetterProps,
  ParseLetterReturn,
} from '../../../constants/Interfaces';
import Rules from '../FrenchRules';

const parseH = (props: ParseLetterProps): ParseLetterReturn => {
  // --- Default ---
  return [
    {
      text: 'h',
      ipa: '',
      rule: Rules.H,
    },
    0,
  ];
};

export default parseH;
