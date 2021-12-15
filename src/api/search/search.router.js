const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const Logger = require(`@api/utils/logger`);

const SearchService = require(`./search.service`);
const searchRequestSchema = require(`./search.router.search-request.schema.json`);

const SEARCH_ROUTE = `/api/search`;

class SearchRouter extends Router {
  static instance = null;

  constructor() {
    if (SearchRouter.instance !== null) {
      return SearchRouter.instance;
    }

    super();

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.searchService = new SearchService();

    this.logger = new Logger({
      name: `API`,
    });

    this.get(SEARCH_ROUTE, handleMiddlewarePromiseRejection(this.search));

    SearchRouter.instance = this;

    return this;
  }

  search = (req, res) => {
    try {
      this.jsonSchemaValidator.validate(searchRequestSchema, req);

      res.send(this.searchService.searchPost(req.query.q));
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        this.logger.error(error);

        res.status(HttpStatusCode.BAD_REQUEST).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = SearchRouter;
