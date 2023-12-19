import { KanjiInformation, KanjiStats } from '../types/yomitan/kanjibank';

export class KanjiEntry {
  kanji: string;
  onyomi: string | undefined;
  kunyomi: string | undefined;
  tags: string | undefined;
  meanings: string[] = [];
  stats: KanjiStats = {};

  /**
   * Represents a kanji entry.
   * @param kanji The kanji to be added to the dictionary.
   */
  constructor(kanji: string) {
    this.kanji = kanji;
  }

  /**
   * Sets the onyomi of the kanji.
   * @param onyomi The onyomi of the kanji.
   */
  setOnyomi(onyomi: string) {
    this.onyomi = onyomi;
    return this;
  }

  /**
   * Sets the kunyomi of the kanji.
   * @param kunyomi The kunyomi of the kanji.
   */
  setKunyomi(kunyomi: string) {
    this.kunyomi = kunyomi;
    return this;
  }

  /**
   * Sets the tags of the kanji.
   * @param tags The tags of the kanji.
   */
  setTags(tags: string) {
    this.tags = tags;
    return this;
  }

  /**
   * Adds a meaning to the kanji.
   * @param meaning The meaning to add to the kanji.
   */
  addMeaning(meaning: string) {
    this.meanings.push(meaning);
    return this;
  }

  /**
   * Sets the stats of the kanji.
   * @param stats The stats of the kanji.
   */
  setStats(stats: KanjiStats) {
    this.stats = stats;
    return this;
  }

  /**
   * Builds the kanji entry.
   */
  build(): KanjiInformation {
    if (!this.onyomi) this.onyomi = '';
    if (!this.kunyomi) this.kunyomi = '';
    if (!this.tags) this.tags = '';

    return [
      this.kanji,
      this.onyomi,
      this.kunyomi,
      this.tags,
      this.meanings,
      this.stats,
    ];
  }
}
