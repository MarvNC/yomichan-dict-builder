const {
  Dictionary,
  DictionaryIndex,
  TermEntry,
  KanjiEntry,
} = require('../dist');

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

  // test term bank iteration
  for (let i = 0; i < 20000; i++) {
    const entry = new TermEntry(`i`).setReading('').build();
    await dictionary.addTerm(entry);
  }

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

  const stats = await dictionary.export('./test');
  console.log('Done exporting!');
  console.table(stats);
  /**
┌────────────────┬────────┐
│    (index)     │ Values │
├────────────────┼────────┤
│   termCount    │ 20002  │
│ termMetaCount  │   5    │
│   kanjiCount   │   1    │
│ kanjiMetaCount │   3    │
└────────────────┴────────┘
   */
})();
