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
  /** Revision of the dictionary. This value is displayed, and used to check for dictionary updates. */
  revision: string;
  /** Whether or not this dictionary contains sequencing information for related terms. */
  sequenced?: boolean;
  /** Format of data found in the JSON data files. */
  format?: 1 | 2 | 3;
  /** Creator of the dictionary. */
  author?: string;
  /** Whether this dictionary contains links to its latest version. */
  isUpdatable?: boolean;
  /** URL for the index file of the latest revision of the dictionary, used to check for updates. */
  indexUrl?: string;
  /** URL for the download of the latest revision of the dictionary. */
  downloadUrl?: string;
  /** URL for the source of the dictionary, displayed in the dictionary details. */
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
