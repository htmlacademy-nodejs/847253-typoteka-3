const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const SIGN_UP_PAGE_ROUTE = `/sign-up`;

/**
 * @readonly
 * @type {string}
 */
const SIGN_UP_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/sign-up-page`);

/**
 * @readonly
 * @type {string}
 */
const SIGN_UP_PAGE_ID = PageId.SIGN_UP;

/**
 * @readonly
 * @type {string}
 */
const SIGN_UP_PAGE_TITLE = `Регистрация`;

class SignUpRouter extends Router {
  /**
   * @type {SignUpRouter | null}
   */
  static instance = null;

  /**
   * @return {SignUpRouter | void}
   */
  constructor() {
    if (SignUpRouter.instance !== null) {
      return SignUpRouter.instance;
    }

    super();

    this.get(SIGN_UP_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSignUpPage));

    SignUpRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getSignUpPage = (req, res) => {
    res.render(SIGN_UP_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: SIGN_UP_PAGE_ID,
        title: SIGN_UP_PAGE_TITLE,
      },
    });
  }
}

module.exports = SignUpRouter;
