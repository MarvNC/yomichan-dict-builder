type ZipFile = `${string}.zip`;

type DictionaryOptions = {
  /**
   * The maximum number of terms in a single term/kanji bank.
   */
  termBankMaxSize: number;
  /**
   * The file name to be used when exporting the dictionary.
   */
  fileName: ZipFile;
};

type OptionalDictionaryOptions = Partial<DictionaryOptions>;

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

type Counters = {
  /**
   * The number of terms in the current term bank.
   */
  termBankCount: number;
  /**
   * The number of term metadata in the current term meta bank.
   */
  termMetaBankCount: number;
  /**
   * The number of kanji in the current kanji bank.
   */
  kanjiBankCount: number;
  /**
   * The number of kanji metadata in the current kanji meta bank.
   */
  kanjiMetaBankCount: number;
};

export {
  DictionaryOptions,
  OptionalDictionaryOptions,
  DictionaryStats,
  Counters,
};
