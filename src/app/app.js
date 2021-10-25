const path = require(`path`);

const express = require(`express`);
const chalk = require(`chalk`);

const {Environment} = require(`@root/src/constants`);

const CONFIG = require(`@app/config`);
const {PageId} = require(`@app/constants`);

const MyRouter = require(`./my/my.router`);
const NotFoundErrorRouter = require(`./not-found-error/not-found-error.router`);
const PostsRouter = require(`./posts/posts.router`);
const RootRouter = require(`./root/root.router`);
const SearchRouter = require(`./search/search.router`);
const SignInRouter = require(`./sign-in/sign-in.router`);
const SignUpRouter = require(`./sign-up/sign-up.router`);

require(`./pug`);

/**
 * @readonly
 * @type {string}
 */
const VIEW_ENGINE = `pug`;

/**
 * @readonly
 * @type {string}
 */
const PUBLIC_PATH = path.resolve(__dirname, `./public`);

/**
 * @readonly
 * @type {string}
 */
const INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH = path.resolve(__dirname, `./views/pages/error-page/error-page`);

/**
 * @readonly
 * @type {string}
 */
const INTERNAL_SERVER_ERROR_PAGE_ID = PageId.INTERNAL_SERVER_ERROR;

/**
 * @readonly
 * @type {string}
 */
const INTERNAL_SERVER_ERROR_PAGE_TITLE = `Что-то пошло не так`;

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
    this.express = express();

    this.express.use(express.json());
    this.express.use(express.static(PUBLIC_PATH));
    this.express.use(new MyRouter());
    this.express.use(new PostsRouter());
    this.express.use(new RootRouter());
    this.express.use(new SearchRouter());
    this.express.use(new SignInRouter());
    this.express.use(new SignUpRouter());
    this.express.use(new NotFoundErrorRouter());
    this.express.use(this.handleInternalServerError);

    this.express.set(`view engine`, VIEW_ENGINE);

    if (this.express.get(`env`) === Environment.PRODUCTION) {
      this.express.enable(`view cache`);
    } else {
      this.express.disable(`view cache`);
    }

    App.instance = this;
  }

  /**
   * @private
   * @return {void}
   */
  handleExpressListen = () => {
    console.info(chalk.green(`The App has been started on port ${CONFIG.APP_PORT}`));
  }

  /**
   * @todo Очень не нравится, что эта логика в классе App, нужно её отсюда выпилить
   *
   * @private
   * @param {Error} error
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @param {ExpressMiddlewareNextFunction} next
   * @return {void}
   */
  handleInternalServerError = (error, req, res, next) => {
    if (error) {
      res.render(INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH, {
        router: {
          href: req.originalUrl,
        },
        page: {
          id: INTERNAL_SERVER_ERROR_PAGE_ID,
          title: INTERNAL_SERVER_ERROR_PAGE_TITLE,
        },
        error: {
          code: `500`,
          title: `Что-то пошло не так`,
        },
        user: {
          name: `Грека`,
          surname: `Река`,
          avatar: `https://thispersondoesnotexist.com/image`,
        },
      });
    }

    next();
  }

  /**
   * @public
   * @return {void}
   */
  start = () => {
    this.express.listen(CONFIG.APP_PORT, this.handleExpressListen);
  }
}

module.exports = App;
