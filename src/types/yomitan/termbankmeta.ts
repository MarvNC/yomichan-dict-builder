type TermFrequency =
  | string
  | number
  | {
      value: number;
      displayValue: string;
    };

type FrequencyTerm = [
  string,
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
  string,
  'pitch',
  {
    reading: string;
    pitches: PitchAccentInfo[];
  },
];

type TermPhoneticTranscription = [
  string,
  'ipa',
  {
    reading: string;
    transcriptions: {
      ipa: string;
      tags?: string[];
    }[];
  },
];

type TermMetaEntryType = PitchTerm | FrequencyTerm | TermPhoneticTranscription;
type DictionaryTermMetaBankV3 = TermMetaEntryType[];

export type {
  DictionaryTermMetaBankV3,
  TermFrequency,
  TermMetaEntryType,
  PitchAccentInfo,
  PitchTerm,
  FrequencyTerm,
  TermPhoneticTranscription
};
