const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  SIGN_UP_PAGE_ROUTE,
  SIGN_UP_PAGE_VIEW_PATH,
  SIGN_UP_PAGE_ID,
  SIGN_UP_PAGE_TITLE,
} = require(`./constants`);

class SignUpRouter extends Router {
  static instance = null;

  constructor() {
    if (SignUpRouter.instance !== null) {
      return SignUpRouter.instance;
    }

    super();

    this.get(SIGN_UP_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSignUpPage));

    SignUpRouter.instance = this;
  }

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
