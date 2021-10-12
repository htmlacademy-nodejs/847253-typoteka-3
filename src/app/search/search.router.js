const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const SEARCH_PAGE_ROUTE = `/search`;

/**
 * @readonly
 * @type {string}
 */
const SEARCH_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/search-page`);

/**
 * @readonly
 * @type {string}
 */
const SEARCH_PAGE_ID = PageId.SEARCH;

/**
 * @readonly
 * @type {string}
 */
const SEARCH_PAGE_TITLE = `Поиск`;

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

    this.get(SEARCH_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSearchPage));

    SearchRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getSearchPage = (req, res) => {
    res.render(SEARCH_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: SEARCH_PAGE_ID,
        title: SEARCH_PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = SearchRouter;
