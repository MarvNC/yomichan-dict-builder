import JSZip from 'jszip';
import fs from 'fs';

// Builders
export * from './builders/dictionaryIndexBuilder';

export class Dictionary {
  options: DictionaryOptions;
  zip: JSZip;
  constructor(options?: DictionaryOptions) {
    this.zip = new JSZip();
    // set default options
    this.options = { ...Constants.defaultOptions, ...options };
  }

  /**
   * Writes the dictionary index
   * @param index
   * @returns
   */
  async setIndex(index: DictionaryIndex) {
    // Check if index instance of DictionaryIndex
    // if(!index instanceof DictionaryIndex) {
    //   throw new Error('Index is not an instance of DictionaryIndex.');
    // }
    await this.saveJsonToZip(Constants.INDEX_FILE_NAME, index);
    return this;
  }

  async saveJsonToZip(fileName: string, data: any) {
    const zip = this.zip;
    const json = JSON.stringify(data);
    zip.file(fileName, json);
  }

  /**
   * Exports the dictionary to a zip file
   * @param path - The directory to export the dictionary to
   * @returns
   */
  async export(path: string) {
    const { fileName } = this.options;
    if (!fileName) {
      throw new Error('No file name set.');
    }

    const zip = this.zip;

    // Check if index.json present in zip
    const index = await zip.file(Constants.INDEX_FILE_NAME)?.async('string');

    if (!index) {
      throw new Error('No index file was set.');
    }

    // Write zip to file
    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    });

    fs.writeFileSync(`${path}/${fileName}`, buffer);
  }
}
