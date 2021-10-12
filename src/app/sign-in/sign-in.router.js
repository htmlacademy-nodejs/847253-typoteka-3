

const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const SIGN_IN_PAGE_ROUTE = `/sign-in`;

/**
 * @readonly
 * @type {string}
 */
const SIGN_IN_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/sign-in-page`);

/**
 * @readonly
 * @type {string}
 */
const SIGN_IN_PAGE_ID = PageId.SIGN_IN;

/**
 * @readonly
 * @type {string}
 */
const SIGN_IN_PAGE_TITLE = `Вход с паролем`;

/**
 * @property {ExpressRouter} router
 */
class SignInRouter extends Router {
  /**
   * @type {SignInRouter | null}
   */
  static instance = null;

  /**
   * @return {SignInRouter | void}
   */
  constructor() {
    if (SignInRouter.instance !== null) {
      return SignInRouter.instance;
    }

    super();

    this.get(SIGN_IN_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSignInPage));

    SignInRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getSignInPage = (req, res) => {
    res.render(SIGN_IN_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: SIGN_IN_PAGE_ID,
        title: SIGN_IN_PAGE_TITLE,
      },
    });
  }
}

module.exports = SignInRouter;
