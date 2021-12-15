const path = require(`path`);

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  SIGN_IN_PAGE_ROUTE,
  SIGN_IN_PAGE_VIEW_PATH,
  SIGN_IN_PAGE_ID,
  SIGN_IN_PAGE_TITLE,
} = require(`./constants`);

class SignInPageRouter extends Router {
  static instance = null;

  constructor() {
    if (SignInPageRouter.instance !== null) {
      return SignInPageRouter.instance;
    }

    super();

    this.get(SIGN_IN_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSignInPage));

    SignInPageRouter.instance = this;
  }

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

module.exports = SignInPageRouter;
