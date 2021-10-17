const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const LoggedError = require(`@root/src/utils/logged-error`);

const SearchService = require(`./search.service`);

class SearchRouterInvalidRequestQueryParameterError extends LoggedError {}

/**
 * @readonly
 * @type {string}
 */
const SEARCH_ROUTE = `/api/search`;

class SearchRouter extends Router {
  /**
   * @type {SearchRouter | null}
   */
  static instance = null;

  /**
   * @return {SearchRouter | void}
   */
  constructor() {
    if (SearchRouter.instance !== null) {
      return SearchRouter.instance;
    }

    super();

    /**
     * @private
     * @readonly
     * @type {SearchService}
     */
    this.searchService = new SearchService();

    this.get(SEARCH_ROUTE, handleMiddlewarePromiseRejection(this.search));

    SearchRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  search = (req, res) => {
    try {
      if (req.query?.q === undefined) {
        throw new SearchRouterInvalidRequestQueryParameterError(`Must have required query parameter 'q'`);
      }

      res.send(this.searchService.search(req.query?.q));
    } catch (error) {
      if (error instanceof SearchRouterInvalidRequestQueryParameterError) {
        res.status(HttpStatusCode.BAD_REQUEST).send({code: error.constructor.name, message: error.message});
      }
    }
  }
}

module.exports = SearchRouter;
