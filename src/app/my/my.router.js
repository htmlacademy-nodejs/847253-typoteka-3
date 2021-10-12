const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  adminCategoriesPageConstants,
  adminCommentsPageConstants,
  adminEditPostPageConstants,
  adminNewPostPageConstants,
  adminPostsPageConstants,
} = require(`./constants`);

class MyRouter extends Router {
  /**
   * @type {MyRouter | null}
   */
  static instance = null;

  /**
   * @return {MyRouter | void}
   */
  constructor() {
    if (MyRouter.instance !== null) {
      return MyRouter.instance;
    }

    super();

    this.get(adminCategoriesPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getAdminCategoriesPage));
    this.get(adminCommentsPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getAdminCommentsPage));
    this.get(adminEditPostPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getAdminEditPostPage));
    this.get(adminNewPostPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getAdminNewPostPage));
    this.get(adminPostsPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getAdminPostsPage));

    MyRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getAdminCategoriesPage = (req, res) => {
    res.render(adminCategoriesPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: adminCategoriesPageConstants.PAGE_ID,
        title: adminCategoriesPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      }
    });
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getAdminCommentsPage = (req, res) => {
    res.render(adminCommentsPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: adminCommentsPageConstants.PAGE_ID,
        title: adminCommentsPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      },
    });
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getAdminEditPostPage = (req, res) => {
    res.render(adminEditPostPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: adminEditPostPageConstants.PAGE_ID,
        title: adminEditPostPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      },
    });
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getAdminNewPostPage = (req, res) => {
    res.render(adminNewPostPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: adminNewPostPageConstants.PAGE_ID,
        title: adminNewPostPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      },
    });
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getAdminPostsPage = (req, res) => {
    res.render(adminPostsPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: adminPostsPageConstants.PAGE_ID,
        title: adminPostsPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Administrator`,
      },
    });
  }
}

module.exports = MyRouter;
