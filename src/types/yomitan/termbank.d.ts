type DetailedDefinition =
  | string
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'structured-content';
      content: StructuredContent;
    }
  | {
      type: 'image';
      path: string;
      width: number;
      height: number;
      title: string;
      description: string;
      pixelated?: boolean;
      imageRendering?: 'auto' | 'pixelated' | 'crisp-edges';
      appearance?: 'auto' | 'monochrome';
      background?: boolean;
      collapsed?: boolean;
      collapsible?: boolean;
    };

type StructuredContentData = {
  [key: string]: string;
};

type StructuredContentStyle = {
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold';
  fontSize?: string;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'overline'
    | 'line-through'
    | ('underline' | 'overline' | 'line-through')[];
  verticalAlign?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'middle'
    | 'top'
    | 'bottom';
  textAlign?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'justify-all'
    | 'match-parent';
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  listStyleType?: string;
};

type StructuredContentNode =
  | string // Represents a text node
  | StructuredContentNode[] // An array of child content
  | {
      tag: 'br';
      data?: StructuredContentData;
    }
  | {
      tag: 'ruby' | 'rt' | 'rp' | 'table' | 'thead' | 'tbody' | 'tfoot' | 'tr';
      content?: StructuredContentNode;
      data?: StructuredContentData;
      lang?: string;
    }
  | {
      tag: 'td' | 'th';
      content?: StructuredContentNode;
      data?: StructuredContentData;
      colSpan?: number;
      rowSpan?: number;
      style?: StructuredContentStyle;
      lang?: string;
    }
  | {
      tag: 'span' | 'div' | 'ol' | 'ul' | 'li';
      content?: StructuredContentNode;
      data?: StructuredContentData;
      style?: StructuredContentStyle;
      lang?: string;
    }
  | {
      tag: 'img';
      data?: StructuredContentData;
      path: string;
      width?: number;
      height?: number;
      title?: string;
      description?: string;
      pixelated?: boolean;
      imageRendering?: 'auto' | 'pixelated' | 'crisp-edges';
      appearance?: 'auto' | 'monochrome';
      background?: boolean;
      collapsed?: boolean;
      collapsible?: boolean;
      verticalAlign?:
        | 'baseline'
        | 'sub'
        | 'super'
        | 'text-top'
        | 'text-bottom'
        | 'middle'
        | 'top'
        | 'bottom';
      sizeUnits?: 'px' | 'em';
    }
  | {
      tag: 'a';
      content?: StructuredContentNode;
      href: string;
      lang?: string;
    };

type StructuredContent = StructuredContentNode;

type TermInformation = [
  term: string,
  reading: string,
  definitionTags: string | null, // String of space-separated tags for the definition
  deinflectors: string, // String of space-separated rule identifiers for the definition
  popularity: number, // Score used to determine popularity
  DetailedDefinition[], // Array of definitions for the term
  sequenceNumber: number, // Sequence number for the term
  termTags: string, // String of space-separated tags for the term
];

type DictionaryTermBankV3 = TermInformation[];

// export type {
//   DictionaryTermBankV3,
//   DetailedDefinition,
//   StructuredContent,
//   StructuredContentData,
//   StructuredContentNode,
//   StructuredContentStyle,
//   TermInformation,
// };
