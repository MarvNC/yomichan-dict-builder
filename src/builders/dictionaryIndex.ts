import path from 'path';
import fs from 'fs';
import { DictionaryIndexType } from '../types/yomitan/dictionaryindex';

export class DictionaryIndex {
  index: DictionaryIndexType;
  constructor(_index?: DictionaryIndexType) {
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
  setFormat(format: DictionaryIndexType['format']) {
    this.index.format = format;
    return this;
  }
  setAuthor(author: string) {
    this.index.author = author;
    return this;
  }
  setIsUpdatable(isUpdatable: boolean) {
    this.index.isUpdatable = isUpdatable;
    return this;
  }
  setIndexUrl(indexUrl: string) {
    this.index.indexUrl = indexUrl;
    return this;
  }
  setDownloadUrl(downloadUrl: string) {
    this.index.downloadUrl = downloadUrl;
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
  setFrequencyMode(mode: DictionaryIndexType['frequencyMode']) {
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
  /**
   * Exports the dictionary index to a JSON file (useful for auto updating dictionaries)
   * @param directory - The directory to export the dictionary to
   */
  async export(directory: string = './', fileName: string = 'index.json') {
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    const saveFullPath = path.join(directory, fileName);
    fs.writeFileSync(saveFullPath, JSON.stringify(this.index));
  }
}
