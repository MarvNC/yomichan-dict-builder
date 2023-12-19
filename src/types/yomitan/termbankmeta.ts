type TermFrequency =
  | string
  | number
  | {
      value: number;
      displayValue: string;
    };

type FrequencyTerm = [
  {},
  'freq',
  (
    | TermFrequency
    | {
        reading: string;
        frequency: TermFrequency;
      }
  ),
];

type PitchAccentInfo = {
  position: number;
  nasal?: number | number[];
  devoice?: number | number[];
  tags?: string[];
};

type PitchTerm = [
  {},
  'pitch',
  {
    reading: string;
    pitches: PitchAccentInfo[];
  },
];

type TermMetaEntryType = PitchTerm | FrequencyTerm;
type DictionaryTermMetaBankV3 = TermMetaEntryType[];

export type {
  DictionaryTermMetaBankV3,
  TermFrequency,
  TermMetaEntryType,
  PitchAccentInfo,
  PitchTerm,
  FrequencyTerm,
};
