const fs = require(`fs`);
const path = require(`path`);

const LoggedError = require(`@root/src/utils/logged-error`);

/**
 * Категория
 *
 * @typedef Category
 * @type {Object}
 *
 * @property {string} id Идентификатор
 * @property {string} name Имя
 */

class CategoriesRepositoryReadFileError extends LoggedError {}

/**
 * @readonly
 * @type {string}
 */
const MOCKS_PATH = path.resolve(__dirname, `./categories.mocks.json`);

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
        const buffer = fs.readFileSync(MOCKS_PATH);

        this._categories = JSON.parse(buffer.toString());
      } catch {
        throw new CategoriesRepositoryReadFileError(`Failed to read file with test data`);
      }
    }

    return this._categories;
  }
}

module.exports = CategoriesRepository;
