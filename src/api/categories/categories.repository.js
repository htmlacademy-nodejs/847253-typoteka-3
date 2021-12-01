const fs = require(`fs`);
const path = require(`path`);

class CategoriesRepositoryReadFileError extends Error {}

const FIXTURES_PATH = path.resolve(__dirname, `./categories.repository.fixtures.json`);

class CategoriesRepository {
  static instance = null;

  constructor() {
    if (CategoriesRepository.instance !== null) {
      return CategoriesRepository.instance;
    }

    this._categories = null;

    CategoriesRepository.instance = this;
  }

  readCategories = (categoriesIds) => {
    if (categoriesIds === undefined) {
      return this.categories;
    }

    return this.categories.filter(({id}) => categoriesIds.includes(id));
  }

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

  set categories(categories) {
    this._categories = categories;
  }
}

module.exports = CategoriesRepository;
