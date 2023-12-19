type KanjiFrequency =
  | string
  | number
  | {
      value: number;
      displayValue: string;
    };

type KanjiCharacterMetadata = [
  kanji: string,
  type: 'freq',
  data: KanjiFrequency,
];

type DictionaryKanjiMetaBankV3 = KanjiCharacterMetadata[];

// export type {
//   DictionaryKanjiMetaBankV3,
//   KanjiCharacterMetadata,
//   KanjiFrequency,
// };
