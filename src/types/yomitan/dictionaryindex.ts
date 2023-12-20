type DictionaryIndexType = {
  title: string;
  revision: string;
  sequenced?: boolean;
  format?: 1 | 2 | 3;
  author: string;
  url?: string;
  description: string;
  attribution: string;
  frequencyMode?: 'occurrence-based' | 'rank-based';
};

export type { DictionaryIndexType };
