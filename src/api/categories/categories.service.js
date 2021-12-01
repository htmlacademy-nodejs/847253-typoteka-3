const CategoriesRepository = require(`./categories.repository`);

class CategoriesService {
  static instance = null;

  constructor() {
    if (CategoriesService.instance !== null) {
      return CategoriesService.instance;
    }

    this.categoriesRepository = new CategoriesRepository();

    CategoriesService.instance = this;
  }

  readCategories = (categoriesIds) => {
    return this.categoriesRepository.readCategories(categoriesIds);
  }
}

module.exports = CategoriesService;
