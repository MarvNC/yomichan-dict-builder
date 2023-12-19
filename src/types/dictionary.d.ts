type DictionaryOptions = {
  /**
   * The maximum number of terms in a single term/kanji bank.
   */
  termBankMaxSize?: number;
  /**
   * The file name to be used when exporting the dictionary.
   */
  fileName?: string;
};

type DictionaryStats = {
  /**
   * The number of terms in the dictionary.
   */
  termCount: number;
  /**
   * The number of term metadata in the dictionary.
   */
  termMetaCount: number;
  /**
   * The number of kanji in the dictionary.
   */
  kanjiCount: number;
  /**
   * The number of kanji metadata in the dictionary.
   */
  kanjiMetaCount: number;
};
