import { DictionaryIndex } from '../types/yomitan/dictionaryindex';

export class DictionaryIndexBuilder {
  index: DictionaryIndex;
  constructor(_index?: DictionaryIndex) {
    this.index = _index || {
      title: '',
      revision: '',
      format: 3,
      author: '',
      description: '',
      attribution: '',
    };
  }
  setTitle(title: string) {
    this.index.title = title;
    return this;
  }
  setRevision(revision: string) {
    this.index.revision = revision;
    return this;
  }
  setFormat(format: DictionaryIndex['format']) {
    this.index.format = format;
    return this;
  }
  setAuthor(author: string) {
    this.index.author = author;
    return this;
  }
  setDescription(description: string) {
    this.index.description = description;
    return this;
  }
  setAttribution(attribution: string) {
    this.index.attribution = attribution;
    return this;
  }
  setUrl(url: string) {
    this.index.url = url;
    return this;
  }
  setSequenced(sequenced: boolean) {
    this.index.sequenced = sequenced;
    return this;
  }
  setFrequencyMode(mode: DictionaryIndex['frequencyMode']) {
    this.index.frequencyMode = mode;
    return this;
  }
  build() {
    if (!this.index.title) throw new Error('Title is required');
    if (!this.index.revision) throw new Error('Revision is required');
    if (!this.index.author) throw new Error('Author is required');
    if (!this.index.description) throw new Error('Description is required');
    if (!this.index.attribution) throw new Error('Attribution is required');

    return this.index;
  }
}
