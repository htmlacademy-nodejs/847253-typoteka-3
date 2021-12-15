const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  ADMIN_CATEGORIES_PAGE_ROUTE,
  ADMIN_CATEGORIES_PAGE_VIEW_PATH,
  ADMIN_CATEGORIES_PAGE_ID,
  ADMIN_CATEGORIES_PAGE_TITLE,
} = require(`./constants`);

class AdminCategoriesPageRouter extends Router {
  static instance = null;

  constructor() {
    if (AdminCategoriesPageRouter.instance !== null) {
      return AdminCategoriesPageRouter.instance;
    }

    super();

    this.get(ADMIN_CATEGORIES_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getAdminCategoriesPage));

    AdminCategoriesPageRouter.instance = this;
  }

  getAdminCategoriesPage = (req, res) => {
    res.render(ADMIN_CATEGORIES_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: ADMIN_CATEGORIES_PAGE_ID,
        title: ADMIN_CATEGORIES_PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      }
    });
  }
}

module.exports = AdminCategoriesPageRouter;
