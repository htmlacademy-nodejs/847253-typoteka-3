const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const CategoriesService = require(`./categories.service`);

/**
 * @readonly
 * @type {string}
 */
const CATEGORIES_ROUTE = `/api/categories`;

class CategoriesRouter extends Router {
  /**
   * @type {CategoriesRouter | null}
   */
  static instance = null;

  /**
   * @return {CategoriesRouter | void}
   */
  constructor() {
    if (CategoriesRouter.instance !== null) {
      return CategoriesRouter.instance;
    }

    super();

    /**
     * @private
     * @readonly
     * @type {CategoriesService}
     */
    this.categoriesService = new CategoriesService();

    this.get(CATEGORIES_ROUTE, handleMiddlewarePromiseRejection(this.readCategories));

    CategoriesRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @return {void}
   */
  readCategories = (_, res) => {
    res.send(this.categoriesService.readCategories());
  }
}

module.exports = CategoriesRouter;
