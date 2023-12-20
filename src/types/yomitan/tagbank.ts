type TagInformation = [
  tagName: string,
  category: string,
  sortingOrder: number,
  notes: string,
  popularityScore: number,
];

type KanjiTagCategory =
  /**
   * Classification
   */
  | 'class'
  /**
   * Codepoint
   */
  | 'code'
  /**
   * Dictionary Indices
   */
  | 'index'
  /**
   * Misc (Shows up at the top)
   */
  | 'misc';

type TagOption = {
  /**
   * The name of the tag.
   */
  name: string;
  /**
   * The category of the tag.
   */
  category: string | KanjiTagCategory;
  /**
   * The sorting order of the tag.
   */
  sortingOrder?: number;
  /**
   * The notes of the tag.
   */
  notes?: string;
  /**
   * The popularity score of the tag.
   */
  popularityScore?: number;
};

type DictionaryTagBankV3 = TagInformation[];

export type { DictionaryTagBankV3, TagOption, TagInformation };
