const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  POSTS_BY_CATEGORY_PAGE_ROUTE,
  POSTS_BY_CATEGORY_PAGE_VIEW_PATH,
  POSTS_BY_CATEGORY_PAGE_ID,
  POSTS_BY_CATEGORY_PAGE_TITLE,
} = require(`./constants`);

class PostsByCategoryPageRouter extends Router {
  static instance = null;

  constructor() {
    if (PostsByCategoryPageRouter.instance !== null) {
      return PostsByCategoryPageRouter.instance;
    }

    super();

    this.get(POSTS_BY_CATEGORY_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getPostsByCategoryPage));

    PostsByCategoryPageRouter.instance = this;
  }

  getPostsByCategoryPage = (req, res) => {
    res.render(POSTS_BY_CATEGORY_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: POSTS_BY_CATEGORY_PAGE_ID,
        title: POSTS_BY_CATEGORY_PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = PostsByCategoryPageRouter;
