import { DetailedDefinition, TermInformation } from '../types/yomitan/termbank';

export class TermEntry {
  term: string;
  reading: string | undefined;
  definitionTags: string | null | undefined;
  deinflectors: string | undefined;
  popularity: number | undefined;
  detailedDefinitions: DetailedDefinition[] = [];
  sequenceNumber: number | undefined;
  termTags: string | undefined;

  /**
   * Represents a term entry.
   * @param term The term to be added to the dictionary.
   */
  constructor(term: string) {
    this.term = term;
  }

  /**
   * Sets the term.
   * @param term The term to be changed to.
   */
  setTerm(term: string) {
    this.term = term;
    return this;
  }

  /**
   * Sets the reading of the term.
   * @param reading The reading of the term.
   */
  setReading(reading: string) {
    this.reading = reading;
    return this;
  }

  /**
   * Sets the definition tags of the term.
   * @param definitionTags The definition tags of the term.
   */
  setDefinitionTags(definitionTags: string) {
    this.definitionTags = definitionTags;
    return this;
  }

  /**
   * Sets the deinflectors of the term.
   * @param deinflectors The deinflectors of the term.
   */
  setDeinflectors(deinflectors: string) {
    this.deinflectors = deinflectors;
    return this;
  }

  /**
   * Sets the popularity of the term.
   * @param popularity The popularity of the term.
   */
  setPopularity(popularity: number) {
    this.popularity = popularity;
    return this;
  }

  /**
   * Adds a definition to the term.
   * @param definition The definition to add to the term.
   */
  addDetailedDefinition(definition: DetailedDefinition) {
    this.detailedDefinitions.push(definition);
    return this;
  }

  /**
   * Sets the sequence number of the term.
   * @param sequenceNumber The sequence number of the term.
   */
  setSequenceNumber(sequenceNumber: number) {
    this.sequenceNumber = sequenceNumber;
    return this;
  }

  /**
   * Sets the term tags of the term.
   * @param termTags The term tags of the term.
   */
  setTermTags(termTags: string) {
    this.termTags = termTags;
    return this;
  }

  /**
   * Builds the term entry.
   */
  build(): TermInformation {
    if (this.reading === undefined) {
      throw new Error('Reading was never set.');
    }
    this.definitionTags = this.definitionTags ?? '';
    this.deinflectors = this.deinflectors ?? '';
    this.popularity = this.popularity ?? 0;
    this.sequenceNumber = this.sequenceNumber ?? 0;
    this.termTags = this.termTags ?? '';
    return [
      this.term,
      this.reading,
      this.definitionTags,
      this.deinflectors,
      this.popularity,
      this.detailedDefinitions,
      this.sequenceNumber,
      this.termTags,
    ];
  }
}
