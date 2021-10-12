const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const NOT_FOUND_ERROR_PAGE_ROUTE = `*`;

/**
 * @readonly
 * @type {string}
 */
const NOT_FOUND_PAGE_VIEW_PATH = path.resolve(__dirname, `../views/pages/error-page/error-page`);

/**
 * @readonly
 * @type {string}
 */
const NOT_FOUND_ERROR_PAGE_ID = PageId.NOT_FOUND_ERROR;

/**
 * @readonly
 * @type {string}
 */
const NOT_FOUND_ERROR_PAGE_TITLE = `Страница отсутствует`;

class NotFoundErrorRouter extends Router {
  /**
   * @type {NotFoundErrorRouter | null}
   */
  static instance = null;

  /**
   * @return {NotFoundErrorRouter | void}
   */
  constructor() {
    if (NotFoundErrorRouter.instance !== null) {
      return NotFoundErrorRouter.instance;
    }

    super();

    this.get(NOT_FOUND_ERROR_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getNotFoundErrorPage));

    NotFoundErrorRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getNotFoundErrorPage = (req, res) => {
    res.render(NOT_FOUND_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: NOT_FOUND_ERROR_PAGE_ID,
        title: NOT_FOUND_ERROR_PAGE_TITLE,
      },
      error: {
        code: `404`,
        title: `Страница отсутствует`,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = NotFoundErrorRouter;
