type TagInfo = {
  category: string;
  order: number;
  notes: string;
  score: number;
};

type DictionaryIndex = {
  title: string;
  revision: string;
  sequenced?: boolean;
  format?: 1 | 2 | 3;
  version?: 1 | 2 | 3;
  author: string;
  url: string;
  description: string;
  attribution: string;
  frequencyMode?: 'occurrence-based' | 'rank-based';
  tagMeta?: Record<string, TagInfo>;
};

export type { DictionaryIndex };
