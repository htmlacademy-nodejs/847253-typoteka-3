const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const Logger = require(`@api/utils/logger`);

const CategoriesService = require(`./categories.service`);

const CATEGORIES_ROUTE = `/api/categories`;

class CategoriesRouter extends Router {
  static instance = null;

  constructor() {
    if (CategoriesRouter.instance !== null) {
      return CategoriesRouter.instance;
    }

    super();

    this.categoriesService = new CategoriesService();

    this.logger = new Logger({
      name: `API`,
    });

    this.get(CATEGORIES_ROUTE, handleMiddlewarePromiseRejection(this.readCategories));

    CategoriesRouter.instance = this;
  }

  readCategories = (_, res) => {
    res.send(this.categoriesService.readCategories());
  }
}

module.exports = CategoriesRouter;
