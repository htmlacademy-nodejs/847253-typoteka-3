const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const SearchService = require(`./search.service`);
const searchRequestSchema = require(`./search-request.schema.json`);

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
     * @type {JsonSchemaValidator}
     */
    this.jsonSchemaValidator = new JsonSchemaValidator();

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
      this.jsonSchemaValidator.validate(searchRequestSchema, req);

      res.send(this.searchService.search(req.query.q));
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        res.status(HttpStatusCode.BAD_REQUEST).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = SearchRouter;
