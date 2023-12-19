import {
  Dictionary,
  DictionaryIndex,
  KanjiEntry,
  TermEntry,
} from '../dist/index.js';
import { DictionaryTagBankV3 } from '../dist/types/yomitan/tagbank.js';
import {
  DetailedDefinition,
  StructuredContent,
} from '../dist/types/yomitan/termbank.js';

const tagBank: DictionaryTagBankV3 = [['tag', 'category', 0, 'notes', 0]];
const structuredContent: StructuredContent = [
  {
    tag: 'div',
    content: 'content',
  },
];

const detailedDefinition: DetailedDefinition = {
  type: 'structured-content',
  content: structuredContent,
};
