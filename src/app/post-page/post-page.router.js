const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {
  POST_PAGE_ROUTE,
  POST_PAGE_VIEW_PATH,
  POST_PAGE_ID,
  POST_PAGE_TITLE,
} = require(`./constants`);

class PostPageRouter extends Router {
  static instance = null;

  constructor() {
    if (PostPageRouter.instance !== null) {
      return PostPageRouter.instance;
    }

    super();

    this.get(POST_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getPostPage));

    PostPageRouter.instance = this;
  }

  getPostPage = (req, res) => {
    res.render(POST_PAGE_VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: POST_PAGE_ID,
        title: POST_PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = PostPageRouter;
