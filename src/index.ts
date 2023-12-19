import JSZip from 'jszip';
import fs from 'fs';

// Builders
export * from './builders/dictionaryIndexBuilder';

const defaultOptions: DictionaryOptions = {
  termBankMaxSize: 10000,
};

type DictionaryOptions = {
  /**
   * The maximum number of terms in a single term/kanji bank.
   */
  termBankMaxSize?: number;
  /**
   * The file name to be used when exporting the dictionary.
   */
  fileName?: string;
};

export class Dictionary {
  options: DictionaryOptions;
  zip: JSZip;
  constructor(options?: DictionaryOptions) {
    this.zip = new JSZip();
    // set default options
    this.options = { ...defaultOptions, ...options };
  }

  setIndex(index: DictionaryIndex) {
    // Check if index instance of DictionaryIndex
    // if(!index instanceof DictionaryIndex) {
    //   throw new Error('Index is not an instance of DictionaryIndex.');
    // }
    this.saveJsonToZip(Constants.INDEX_FILE_NAME, index);
  }

  async export(path: string) {
    const { fileName } = this.options;
    if (!fileName) {
      throw new Error('No file name set.');
    }
    
    const zip = this.zip;
    
    // Check if index.json present in zip
    const index = await zip.file(Constants.INDEX_FILE_NAME)?.async('string');

    if (!index) {
      throw new Error('No index.json found.');
    }
  }

  async saveJsonToZip(fileName: string, data: any) {
    const zip = this.zip;
    const json = JSON.stringify(data);
    zip.file(fileName, json);
  }
}
