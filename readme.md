# Yomichan/Yomitan Dictionary Builder

![npm](https://img.shields.io/npm/v/yomichan-dict-builder?style=for-the-badge)(https://www.npmjs.com/package/yomichan-dict-builder)

This is a library for building dictionaries for [Yomichan](https://foosoft.net/projects/yomichan/)/[Yomitan](https://github/themoeway/yomitan) from scratch.

## Installation

```sh
npm install yomichan-dict-builder
```

## Usage

Here is an example covering pretty much all the features of the library. You might want to set `"js/ts.implicitProjectConfig.checkJs": true` in your VSCode settings to get type checking for JavaScript files and not have to deal with your dictionaries failing to validate against the Yomitan schemas.

```js
const {
  Dictionary,
  DictionaryIndex,
  TermEntry,
  KanjiEntry,
} = require('yomichan-dict-builder');

(async () => {
  const dictionary = new Dictionary({
    fileName: 'test.zip',
  });

  // index
  const index = new DictionaryIndex()
    .setTitle('Test Dictionary')
    .setRevision('1.0')
    .setAuthor('Marv')
    .setDescription('Test dictionary for yomichan-dict-builder')
    .setAttribution('test')
    .setUrl('https://example.com')
    .build();

  await dictionary.setIndex(index);

  // term entries
  const entry = new TermEntry('test').setReading('test').build();
  await dictionary.addTerm(entry);

  const entry2 = new TermEntry('test2')
    .setReading('reading')
    .addDetailedDefinition({
      type: 'structured-content',
      content: [
        {
          tag: 'span',
          content: 'string',
          data: {
            'dict-data': 'test',
          },
          lang: 'ja',
          style: {
            fontSize: '20px',
            fontWeight: 'normal',
            textDecorationLine: 'overline',
          },
        },
      ],
    })
    .addDetailedDefinition('test2')
    .build();
  await dictionary.addTerm(entry2);

  // term meta
  // simple frequency
  dictionary.addTermMeta(['term', 'freq', 1]);
  dictionary.addTermMeta(['term', 'freq', 'N1']);
  dictionary.addTermMeta([
    'term',
    'freq',
    {
      value: 1,
      displayValue: 'one',
    },
  ]);
  dictionary.addTermMeta([
    'a',
    'freq',
    {
      reading: 'termreading',
      frequency: {
        value: 1,
        displayValue: 'one',
      },
    },
  ]);
  // pitch
  dictionary.addTermMeta([
    '亜',
    'pitch',
    {
      reading: 'あ',
      pitches: [
        {
          position: 1,
          // devoice: [], // optional
          // nasal: [], // optional
        },
      ],
    },
  ]);

  // kanji entries
  dictionary.addKanji([
    '㖨',
    '',
    '',
    'jouyou',
    ['Indistinct nasal utterance', 'laugh', 'sound of birds'],
    { jis213: '2-04-06', skip: '1-3-8', strokes: '11', ucs: '35A8' },
  ]);

  // kanji meta
  dictionary.addKanjiMeta([
    '亜',
    'freq',
    {
      value: 1,
      displayValue: 'one',
    },
  ]);
  dictionary.addKanjiMeta(['亜', 'freq', 1]);
  dictionary.addKanjiMeta(['亜', 'freq', 'one']);

  // tags
  dictionary.setTagBank([
    ['jouyou', 'frequent', -5, 'included in list of regular-use characters', 0],
  ]);

  await dictionary.export('./');
  console.log('Done exporting');
})();
```
