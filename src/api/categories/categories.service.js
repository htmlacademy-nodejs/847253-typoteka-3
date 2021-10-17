const CategoriesRepository = require(`./categories.repository`);

class CategoriesService {
  /**
   * @type {CategoriesService | null}
   */
  static instance = null;

  /**
   * @return {CategoriesService | void}
   */
  constructor() {
    if (CategoriesService.instance !== null) {
      return CategoriesService.instance;
    }

    /**
     * @private
     * @readonly
     * @type {CategoriesRepository}
     */
    this.categoriesRepository = new CategoriesRepository();

    CategoriesService.instance = this;
  }

  /**
   * @public
   * @return {Category[]}
   */
  readCategories = () => {
    return this.categoriesRepository.readCategories();
  }
}

module.exports = CategoriesService;
