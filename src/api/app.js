const express = require(`express`);
const chalk = require(`chalk`);

const {HttpStatusCode} = require(`@root/src/constants`);
const LoggedError = require(`@root/src/utils/logged-error`);

const CONFIG = require(`@api/config`);

const CategoriesRouter = require(`./categories/categories.router`);
const PostsRouter = require(`./posts/posts.router`);
const SearchRouter = require(`./search/search.router`);

/**
 * @readonly
 * @type {string}
 */
const NOT_FOUND_ERROR_ROUTE = `*`;

class AppRouterNotFoundError extends LoggedError {}
class AppInternalServerError extends LoggedError {}

class App {
  /**
   * @type {App | null}
   */
  static instance = null;

  /**
   * @return {App | void}
   */
  constructor() {
    if (App.instance !== null) {
      return App.instance;
    }

    /**
     * @private
     * @type {ExpressApplication}
     */
    this.expressApplication = express();

    this.expressApplication.use(express.json());
    this.expressApplication.use(new CategoriesRouter());
    this.expressApplication.use(new PostsRouter());
    this.expressApplication.use(new SearchRouter());
    this.expressApplication.use(NOT_FOUND_ERROR_ROUTE, this.handleNotFoundError);
    this.expressApplication.use(this.handleInternalServerError);
  }

  /**
   * @private
   * @return {void}
   */
  handleExpressListen = () => {
    console.info(chalk.green(`The API has been started on port ${CONFIG.API_PORT}`));
  }

  /**
   * @public
   * @return {void}
   */
  start() {
    this.expressApplication.listen(CONFIG.API_PORT, this.handleExpressListen);
  }

  /**
   * @private
   * @param {Error} _error
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @param {ExpressMiddlewareNextFunction} next
   * @return {*}
   */
  handleInternalServerError = (_error, _, res, next) => {
    const error = new AppInternalServerError(_error.message);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({code: error.constructor.name, message: error.message});

    return next();
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  handleNotFoundError = (req, res) => {
    const error = new AppRouterNotFoundError(`Resource with baseUrl '${req.baseUrl}' not found`);

    res.status(HttpStatusCode.NOT_FOUND).send({code: error.code, message: error.message});
  }
}

module.exports = App;
