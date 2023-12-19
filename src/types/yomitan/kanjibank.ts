type KanjiStats = Record<string, string>;

type KanjiInformation = [
  kanji: string,
  onyomi: string,
  kunyomi: string,
  tags: string,
  meanings: string[],
  stats: KanjiStats,
];

type DictionaryKanjiBankV3 = KanjiInformation[];

export type {
  DictionaryKanjiBankV3,
  KanjiInformation,
  KanjiStats,
};
