import { IsoLanguageCode } from '../IsoLanguageCode';

/**
 * Information about a single tag.
 */
type TagInfo = {
  category?: string;
  order?: number;
  notes?: string;
  score?: number;
};

/**
 * Represents the structure of a dictionary index file.
 */
type DictionaryIndexType = {
  /** Title of the dictionary. */
  title: string;
  /** Revision of the dictionary. This value is only used for displaying information. */
  revision: string;
  /** Whether or not this dictionary contains sequencing information for related terms. */
  sequenced?: boolean;
  /** Format of data found in the JSON data files. */
  format?: 1 | 2 | 3;
  /** Creator of the dictionary. */
  author?: string;
  /** URL for the source of the dictionary. */
  url?: string;
  /** Description of the dictionary data. */
  description?: string;
  /** Attribution information for the dictionary data. */
  attribution?: string;
  /** Language of the terms in the dictionary. */
  sourceLanguage?: IsoLanguageCode;
  /** Main language of the definitions in the dictionary. */
  targetLanguage?: IsoLanguageCode;
  /** Frequency mode of the dictionary. */
  frequencyMode?: 'occurrence-based' | 'rank-based';
};

export type { DictionaryIndexType, IsoLanguageCode, TagInfo };
