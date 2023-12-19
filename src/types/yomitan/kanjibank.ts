type KanjiMeaning = string;
type KanjiStats = Record<string, string>;

type KanjiInformation = [
  kanji: string,
  onyomi: string,
  kunyomi: string,
  tags: string,
  meanings: KanjiMeaning[],
  stats: KanjiStats,
];

type DictionaryKanjiBankV3 = KanjiInformation[];

export type {
  DictionaryKanjiBankV3,
  KanjiInformation,
  KanjiMeaning,
  KanjiStats,
};
