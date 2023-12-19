import JSZip from 'jszip';
import fs from 'fs';

// Builders
export * from './builders/dictionaryIndexBuilder';
export * from './builders/termEntryBuilder';

// Types
import { DictionaryIndex } from './types/yomitan/dictionaryindex';
import {
  DictionaryOptions,
  OptionalDictionaryOptions,
  DictionaryStats,
  Counters,
} from './types/dictionary';
import {
  DictionaryTermBankV3,
  TermInformation,
} from './types/yomitan/termbank';

const INDEX_FILE_NAME = 'index.json';
const TERM_BANK_FILE_NAME = (bankNumber: number) =>
  `term_bank_${bankNumber}.json`;
const TERM_META_BANK_FILE_NAME = (bankNumber: number) =>
  `term_meta_bank_${bankNumber}.json`;
const KANJI_BANK_FILE_NAME = (bankNumber: number) =>
  `kanji_bank_${bankNumber}.json`;
const KANJI_META_BANK_FILE_NAME = (bankNumber: number) =>
  `kanji_meta_bank_${bankNumber}.json`;

const defaultOptions: OptionalDictionaryOptions = {
  termBankMaxSize: 10000,
};

export class Dictionary {
  options: DictionaryOptions;

  zip: JSZip = new JSZip();

  stats: DictionaryStats = {
    termCount: 0,
    termMetaCount: 0,
    kanjiCount: 0,
    kanjiMetaCount: 0,
  };

  counters: Counters = {
    termBankCount: 0,
    termMetaBankCount: 0,
    kanjiBankCount: 0,
    kanjiMetaBankCount: 0,
  };

  termBank: DictionaryTermBankV3 = [];

  constructor(options: DictionaryOptions) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Writes the dictionary index
   * @param index - JSON object
   * @returns
   */
  async setIndex(index: DictionaryIndex) {
    await this.saveJsonToZip(INDEX_FILE_NAME, index);
    return this;
  }

  /**
   * Adds a term to the dictionary
   * @param term - The term to add
   */
  async addTerm(term: TermInformation) {
    this.termBank.push(term);
    this.stats.termCount++;
    if (this.termBank.length >= this.options.termBankMaxSize) {
      await this.saveTermBank();
    }
  }

  /**
   * Saves a term bank to the zip
   */
  private async saveTermBank() {
    const { termBankCount } = this.counters;
    await this.saveJsonToZip(TERM_BANK_FILE_NAME(termBankCount), this.termBank);
    this.termBank = [];
    this.counters.termBankCount++;
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
    const index = await zip.file(INDEX_FILE_NAME)?.async('string');

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

  private async saveJsonToZip(fileName: string, data: any) {
    const zip = this.zip;
    const json = JSON.stringify(data);
    zip.file(fileName, json);
  }
}
