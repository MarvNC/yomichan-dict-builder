import JSZip from 'jszip';
import fs from 'fs';

// Builders
export * from './builders/dictionaryIndex';
export * from './builders/termEntry';
export * from './builders/kanjiEntry';

// Types
import { DictionaryIndexType } from './types/yomitan/dictionaryindex';
import {
  DictionaryOptions,
  DictionaryStats,
  Counters,
  DefaultOptions,
} from './types/dictionary';
import {
  DictionaryTermBankV3,
  TermInformation,
} from './types/yomitan/termbank';
import {
  DictionaryTermMetaBankV3,
  TermMetaEntryType,
} from './types/yomitan/termbankmeta';
import {
  DictionaryKanjiBankV3,
  KanjiInformation,
} from './types/yomitan/kanjibank';
import {
  DictionaryKanjiMetaBankV3,
  KanjiCharacterMetadata,
} from './types/yomitan/kanjibankmeta';
import { DictionaryTagBankV3 } from './types/yomitan/tagbank';

const INDEX_FILE_NAME = 'index.json';
const TERM_BANK_FILE_NAME = (bankNumber: number) =>
  `term_bank_${bankNumber}.json`;
const TERM_META_BANK_FILE_NAME = (bankNumber: number) =>
  `term_meta_bank_${bankNumber}.json`;
const KANJI_BANK_FILE_NAME = (bankNumber: number) =>
  `kanji_bank_${bankNumber}.json`;
const KANJI_META_BANK_FILE_NAME = (bankNumber: number) =>
  `kanji_meta_bank_${bankNumber}.json`;

const defaultOptions: DefaultOptions = {
  termBankMaxSize: 10000,
};

export class Dictionary {
  options: Required<DictionaryOptions>;

  zip: JSZip = new JSZip();

  stats: DictionaryStats = {
    termCount: 0,
    termMetaCount: 0,
    kanjiCount: 0,
    kanjiMetaCount: 0,
  };

  counters: Counters = {
    termBankCount: 1,
    termMetaBankCount: 1,
    kanjiBankCount: 1,
    kanjiMetaBankCount: 1,
  };

  termBank: DictionaryTermBankV3 = [];
  termMetaBank: DictionaryTermMetaBankV3 = [];
  kanjiBank: DictionaryKanjiBankV3 = [];
  kanjiMetaBank: DictionaryKanjiMetaBankV3 = [];

  constructor(options: DictionaryOptions) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Writes the dictionary index
   * @param index - JSON object
   * @returns
   */
  async setIndex(index: DictionaryIndexType) {
    await this.saveJsonToZip(INDEX_FILE_NAME, index);
    return this;
  }

  /**
   * Writes the tagbank
   * @param tagBank - The tagbank to set
   */
  async setTagBank(tagBank: DictionaryTagBankV3) {
    await this.saveJsonToZip('tag_bank.json', tagBank);
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
    if (this.termBank.length === 0) return;
    const { termBankCount } = this.counters;
    await this.saveJsonToZip(TERM_BANK_FILE_NAME(termBankCount), this.termBank);
    this.termBank = [];
    this.counters.termBankCount++;
  }

  /**
   * Adds a term meta to the dictionary
   * @param meta - The term meta to add
   */
  async addTermMeta(meta: TermMetaEntryType) {
    this.termMetaBank.push(meta);
    this.stats.termMetaCount++;
    if (this.termMetaBank.length >= this.options.termBankMaxSize) {
      await this.saveTermMetaBank();
    }
  }

  /**
   * Saves a term meta bank to the zip
   */
  private async saveTermMetaBank() {
    if (this.termMetaBank.length === 0) return;
    const { termMetaBankCount } = this.counters;
    await this.saveJsonToZip(
      TERM_META_BANK_FILE_NAME(termMetaBankCount),
      this.termMetaBank,
    );
    this.termMetaBank = [];
    this.counters.termMetaBankCount++;
  }

  /**
   * Adds a kanji to the dictionary
   * @param kanji - The kanji to add
   */
  async addKanji(kanji: KanjiInformation) {
    this.kanjiBank.push(kanji);
    this.stats.kanjiCount++;
    if (this.kanjiBank.length >= this.options.termBankMaxSize) {
      await this.saveKanjiBank();
    }
  }

  /**
   * Saves a kanji bank to the zip
   */
  private async saveKanjiBank() {
    if (this.kanjiBank.length === 0) return;
    const { kanjiBankCount } = this.counters;
    await this.saveJsonToZip(
      KANJI_BANK_FILE_NAME(kanjiBankCount),
      this.kanjiBank,
    );
    this.kanjiBank = [];
    this.counters.kanjiBankCount++;
  }

  /**
   * Adds a kanji meta to the dictionary
   * @param meta - The kanji meta to add
   */
  async addKanjiMeta(meta: KanjiCharacterMetadata) {
    this.kanjiMetaBank.push(meta);
    this.stats.kanjiMetaCount++;
    if (this.kanjiMetaBank.length >= this.options.termBankMaxSize) {
      await this.saveKanjiMetaBank();
    }
  }

  /**
   * Saves a kanji meta bank to the zip
   */
  private async saveKanjiMetaBank() {
    if (this.kanjiMetaBank.length === 0) return;
    const { kanjiMetaBankCount } = this.counters;
    await this.saveJsonToZip(
      KANJI_META_BANK_FILE_NAME(kanjiMetaBankCount),
      this.kanjiMetaBank,
    );
    this.kanjiMetaBank = [];
    this.counters.kanjiMetaBankCount++;
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

    // Add remaining banks to zip
    await this.saveTermBank();

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
