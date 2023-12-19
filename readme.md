# Yomichan/Yomitan Dictionary Builder

[![npm](https://img.shields.io/npm/v/yomichan-dict-builder?style=for-the-badge)](https://www.npmjs.com/package/yomichan-dict-builder)

This is a library for building dictionaries for [Yomichan](https://foosoft.net/projects/yomichan/)/[Yomitan](https://github/themoeway/yomitan) from scratch.

## Installation

```sh
npm install yomichan-dict-builder
```

## Contributing

Please let me know if you find any bugs or have any feature requests. I'd love to see this library be used to create more Yomitan dictionaries, so if you do end up using it, please let me know!

## Usage

JS:

```js
const {
  Dictionary,
  DictionaryIndex,
  TermEntry,
  KanjiEntry,
} = require('yomichan-dict-builder');
```

TS:

```ts
import {
  Dictionary,
  DictionaryIndex,
  KanjiEntry,
  TermEntry,
} from 'yomichan-dict-builder';
```

You might want to set `"js/ts.implicitProjectConfig.checkJs": true` in your VSCode settings to get type checking for JavaScript files and not have to deal with your dictionaries failing to validate against the Yomitan schemas.

## Examples

- [example.js](./examples/example.js) - A simple example of how to use the library.
- [CC-CEDICT for Yomitan](https://github.com/MarvNC/cc-cedict-yomitan) - A dictionary built using this library (see convert.js).
