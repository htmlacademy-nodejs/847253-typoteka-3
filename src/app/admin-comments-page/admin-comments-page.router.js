const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const AdminCommentsPageService = require(`./admin-comments-page.service`);

const {
  ADMIN_COMMENTS_PAGE_ROUTE,
  ADMIN_COMMENTS_PAGE_VIEW_PATH,
  ADMIN_COMMENTS_PAGE_ID,
  ADMIN_COMMENTS_PAGE_TITLE,
} = require(`./constants`);

class AdminCommentsPageRouter extends Router {
  static instance = null;

  constructor() {
    if (AdminCommentsPageRouter.instance !== null) {
      return AdminCommentsPageRouter.instance;
    }

    super();

    this.adminCommentsPageService = new AdminCommentsPageService();

    this.get(ADMIN_COMMENTS_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getAdminCommentsPage));

    AdminCommentsPageRouter.instance = this;
  }

  getAdminCommentsPage = async (req, res) => {
    const comments = await this.adminCommentsPageService.readComments();
    const user = await this.adminCommentsPageService.readUser();

    res.render(ADMIN_COMMENTS_PAGE_VIEW_PATH, {
      comments,
      user,
      router: {
        href: req.originalUrl,
      },
      page: {
        id: ADMIN_COMMENTS_PAGE_ID,
        title: ADMIN_COMMENTS_PAGE_TITLE,
      },
    });
  }
}

module.exports = AdminCommentsPageRouter;
