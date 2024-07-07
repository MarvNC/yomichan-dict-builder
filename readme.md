# Yomichan/Yomitan Dictionary Builder

[![npm](https://img.shields.io/npm/v/yomichan-dict-builder?style=for-the-badge)](https://www.npmjs.com/package/yomichan-dict-builder)

This is a library for building dictionaries for
[Yomitan](https://github/themoeway/yomitan) from scratch. Note that Yomichan is
no longer being maintained, and thus is not compatible with some new
dictionaries that are developed using new features exclusive to Yomitan.

## Installation

```sh
npm install yomichan-dict-builder
```

## Contributing

Please let me know if you find any bugs or have any feature requests. I'd love
to see this library be used to create more Yomitan dictionaries, so if you do
end up using it, please let me know!

## Used In

- [example.js](./examples/example.js) - A simple example of how to use the
  library.
- [CC-CEDICT for Yomitan](https://github.com/MarvNC/cc-cedict-yomitan)
- [Wikipedia for Yomitan](https://github.com/MarvNC/wikipedia-yomitan)
- [VNDB To Yomitan](https://github.com/asayake-b5/yomitan-vndb) - A tool for
  creating Yomitan dictionaries of visual novel character names from vndb.org.
- [words.hk for Yomitan](https://github.com/MarvNC/wordshk-yomitan)

## Usage

- The `Dictionary` class represents a Yomitan dictionary. You can add entries,
  kanji, and other things to it before exporting it with `export()`.
- The `DictionaryIndex`, `TermEntry`, and `KanjiEntry` classes represent some of
  the more complicated parts of a Yomitan dictionary. You can create them and
  add them to a dictionary using the `setIndex()`, `addTerm()`, and `addKanji()`
  methods of the `Dictionary` class.
- You might want to set `"js/ts.implicitProjectConfig.checkJs": true` in your
  VSCode settings to get type checking for JavaScript files and not have to deal
  with your dictionaries failing to validate against the Yomitan schemas.
- In particular, it might be a good idea to check out the
  [Yomitan Schemas](https://github.com/MarvNC/yomichan-dictionaries/blob/master/how-to-make-yomichan-dictionaries.md#read-the-schemas)
  as well as the type definitions within the package so that you know what's
  available for use when creating detailed definitions.
- You can then type your objects in JS by using JSDoc comments to provide editor
  intellisense and type checking. You can see this in action in
  [example.js](./examples/example.js).

### Dictionary Class

The `Dictionary` class represents a Yomitan dictionary and is used to manage
entries, kanji, and various metadata before exporting.

#### Initializing a Dictionary

To create a new dictionary:

```javascript
const { Dictionary } = require('yomichan-dict-builder');

const dictionary = new Dictionary({
  fileName: 'test.zip',
});
```

#### Setting Index Information

You can create an index for the dictionary using the `DictionaryIndex` class and
add it to the dictionary using `setIndex()`:

```javascript
const { DictionaryIndex } = require('yomichan-dict-builder');

const index = new DictionaryIndex()
  .setTitle('Test Dictionary')
  .setRevision('1.0')
  .setAuthor('Marv')
  .setDescription('Test dictionary for yomichan-dict-builder')
  // ...additional index details
  .build();

await dictionary.setIndex(index);
```

#### Adding Term Entries

Term entries can be added using the `addTerm()` method of the `Dictionary`
class:

```javascript
const { TermEntry } = require('yomichan-dict-builder');

const entry = new TermEntry('test').setReading('test').build();
await dictionary.addTerm(entry);
```

Additionally, detailed definitions can be added to a term entry:

```javascript
// Creating a detailed definition
const detailedDefinition = {
  type: 'structured-content',
  // ...detailed definition content
};

const entry2 = new TermEntry('test2')
  .setReading('reading')
  .addDetailedDefinition(detailedDefinition)
  .addDetailedDefinition('test2')
  .build();

await dictionary.addTerm(entry2);
```

#### Adding Kanji Entries

Kanji entries can be added using the `addKanji()` method:

```javascript
dictionary.addKanji({
  kanji: '読',
  kunyomi: 'あ',
  onyomi: 'ア',
  meanings: ['Asia'],
  stats: {
    strokes: '7',
    grade: '8',
  },
});
dictionary.addKanji({
  kanji: '詠',
});

// Alternatively, create a KanjiEntry object first
const { KanjiEntry } = require('yomichan-dict-builder');
const kanjiEntry = new KanjiEntry('亜')
  .setKunyomi('あ')
  .setOnyomi('ア')
  .addMeaning('Asia')
  .setStats({ strokes: '7', grade: '8' });

dictionary.addKanji(kanjiEntry.build());
```

Note that the statistics added here must be added as tags as well.

#### Adding Frequency

Frequency information can be added to terms and kanji using the `addTermMeta()`
and `addKanjiMeta()` methods:

```javascript
dictionary.addTermMeta(['term', 'freq', 1]);
dictionary.addTermMeta(['term', 'freq', 'N1']);
// ...additional term metadata

dictionary.addKanjiMeta(['亜', 'freq', 1]);
dictionary.addKanjiMeta(['亜', 'freq', 'one']);
// ...additional kanji metadata
```

#### Adding Pitch Accent

Pitch accent information can be added to terms using the `addTermMeta()` method:

```javascript
dictionary.addTermMeta([
  '亜',
  'pitch',
  {
    reading: 'あ',
    pitches: [
      {
        position: 1,
        devoice: [], // optional
        nasal: [], // optional
      },
    ],
  },
]);
```

#### Adding Tags

Tags can be added to the dictionary. These are necessary when you add a
tag/statistic to a term or kanji entry.

```javascript
dictionary.addTag({
  name: 'jouyou',
  category: 'frequent',
  sortingOrder: -5,
  notes: 'included in list of regular-use characters',
  popularityScore: 0,
});
```

#### Adding Local Files

You can add local files like images to the dictionary using the `addFile()`
method:

```js
await dictionary.addFile('./examples/icon64.png', 'img/icon64.png');
```

This copies the file at `./examples/icon64.png` and saves it into the dictionary
zip file at `img/icon64.png`.

The file can then be referenced in structured content definitions:

```js
const imageScNode = {
  tag: 'img',
  path: 'img/icon64.png',
  data: {
    'dict-data': 'testImage',
  },
  title: 'test image',
};
```

So `addFile()` allows you to bundle any needed images, audio clips, etc. into
the dictionary itself.

#### Exporting the Dictionary

To export the constructed dictionary:

```javascript
const stats = await dictionary.export('./test');
console.log('Done exporting!');
console.table(stats);
// ┌────────────────┬────────┐
// │    (index)     │ Values │
// ├────────────────┼────────┤
// │   termCount    │ 20002  │
// │ termMetaCount  │   5    │
// │   kanjiCount   │   1    │
// │ kanjiMetaCount │   3    │
// └────────────────┴────────┘
```
