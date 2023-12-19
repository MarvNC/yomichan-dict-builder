type TermFrequency =
  | string
  | number
  | {
      value: number;
      displayValue: string;
    };

type PitchAccentInfo = {
  position: number;
  nasal?: number | number[];
  devoice?: number | number[];
  tags: string[];
};

type PitchTerm = [
  {},
  'pitch',
  {
    reading: string;
    pitches: PitchAccentInfo[];
  },
];

type FrequencyTerm =
  | [{}, 'freq', TermFrequency]
  | [
      {},
      'freq',
      {
        reading: string;
        frequency: TermFrequency;
      },
    ];

type DictionaryTermMetaBankV3 = Array<PitchTerm | FrequencyTerm>;

// export type {
//   DictionaryTermMetaBankV3,
//   TermFrequency,
//   PitchAccentInfo,
//   PitchTerm,
//   FrequencyTerm,
// };
