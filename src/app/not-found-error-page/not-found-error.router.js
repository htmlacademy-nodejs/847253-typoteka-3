

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  NOT_FOUND_ERROR_PAGE_ROUTE,
  NOT_FOUND_ERROR_PAGE_VIEW_PATH,
  NOT_FOUND_ERROR_PAGE_ID,
  NOT_FOUND_ERROR_PAGE_TITLE,
} = require(`./constants`);

class NotFoundErrorRouter extends Router {
  static instance = null;

  constructor() {
    if (NotFoundErrorRouter.instance !== null) {
      return NotFoundErrorRouter.instance;
    }

    super();

    this.get(NOT_FOUND_ERROR_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getNotFoundErrorPage));

    NotFoundErrorRouter.instance = this;
  }

  getNotFoundErrorPage = (req, res) => {
    res.render(NOT_FOUND_ERROR_PAGE_VIEW_PATH, {
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
