const fs = require(`fs`);
const path = require(`path`);

/**
 * Категория
 *
 * @typedef Category
 * @type {Object}
 *
 * @property {string} id Идентификатор
 * @property {string} name Имя
 */

class CategoriesRepositoryReadFileError extends Error {}

/**
 * @readonly
 * @type {string}
 */
const FIXTURES_PATH = path.resolve(__dirname, `./categories.repository.fixtures.json`);

class CategoriesRepository {
  /**
   * @type {CategoriesRepository | null}
   */
  static instance = null;

  /**
   * @return {CategoriesRepository | void}
   */
  constructor() {
    if (CategoriesRepository.instance !== null) {
      return CategoriesRepository.instance;
    }

    /**
     * @private
     * @type {Category[] | null}
     */
    this._categories = null;

    CategoriesRepository.instance = this;
  }

  /**
   * @public
   * @return {Category[]}
   */
  readCategories = () => {
    return this.categories;
  }

  /**
   * @private
   * @return {Category[]}
   * @throws {CategoriesRepositoryReadFileError}
   */
  get categories() {
    if (this._categories === null) {
      try {
        const buffer = fs.readFileSync(FIXTURES_PATH);

        this._categories = JSON.parse(buffer.toString());
      } catch {
        throw new CategoriesRepositoryReadFileError(`Failed to read file with fixtures`);
      }
    }

    return this._categories;
  }

  /**
   * @param {Category[] | null} categories
   * @return {void}
   */
  set categories(categories) {
    this._categories = categories;
  }
}

module.exports = CategoriesRepository;
