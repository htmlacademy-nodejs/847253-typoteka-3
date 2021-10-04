'use strict';

const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const MAIN_PAGE_ROUTE = `/`;

/**
 * @readonly
 * @type {string}
 */
const MAIN_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/main-page`);

/**
 * @readonly
 * @type {string}
 */
const MAIN_PAGE_ID = PageId.MAIN;

class RootRouter extends Router {
  /**
   * @type {RootRouter || null}
   */
  static instance = null;

  /**
   * @return {RootRouter || void}
   */
  constructor() {
    if (RootRouter.instance !== null) {
      return RootRouter.instance;
    }

    super();

    this.get(MAIN_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getMainPage));

    RootRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getMainPage = (req, res) => {
    throw new Error();
    res.render(MAIN_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
        query: req.query || {}, // TODO
      },
      page: {
        id: MAIN_PAGE_ID,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = RootRouter;
