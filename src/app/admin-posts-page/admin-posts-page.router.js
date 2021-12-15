const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const AdminPostsPageService = require(`./admin-posts-page.service`);

const {
  ADMIN_POSTS_PAGE_ROUTE,
  ADMIN_POSTS_PAGE_VIEW_PATH,
  ADMIN_POSTS_PAGE_ID,
  ADMIN_POSTS_PAGE_TITLE,
} = require(`./constants`);

class AdminPostsPageRouter extends Router {
  static instance = null;

  constructor() {
    if (AdminPostsPageRouter.instance !== null) {
      return AdminPostsPageRouter.instance;
    }

    super();

    this.adminPostsPageService = new AdminPostsPageService();

    this.get(ADMIN_POSTS_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getAdminPostsPage));

    AdminPostsPageRouter.instance = this;
  }

  getAdminPostsPage = async (req, res) => {
    const posts = await this.adminPostsPageService.readPosts();
    const user = await this.adminPostsPageService.readUser();

    res.render(ADMIN_POSTS_PAGE_VIEW_PATH, {
      posts,
      user,
      router: {
        href: req.originalUrl,
      },
      page: {
        id: ADMIN_POSTS_PAGE_ID,
        title: ADMIN_POSTS_PAGE_TITLE,
      },
    });
  }
}

module.exports = AdminPostsPageRouter;

