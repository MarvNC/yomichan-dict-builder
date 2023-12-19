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

type TermMetaEntry = PitchTerm | FrequencyTerm;
type DictionaryTermMetaBankV3 = TermMetaEntry[];

export type {
  DictionaryTermMetaBankV3,
  TermFrequency,
  TermMetaEntry,
  PitchAccentInfo,
  PitchTerm,
  FrequencyTerm,
};
