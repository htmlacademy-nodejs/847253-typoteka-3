const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const MainPageService = require(`./main-page.service`);

const {
  MAIN_PAGE_ROUTE,
  MAIN_PAGE_VIEW_PATH,
  MAIN_PAGE_ID,
  MAIN_PAGE_TITLE,
} = require(`./constants`);

class RootRouter extends Router {
  static instance = null;

  constructor() {
    if (RootRouter.instance !== null) {
      return RootRouter.instance;
    }

    super();

    this.mainPageService = new MainPageService();

    this.get(MAIN_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getMainPage));

    RootRouter.instance = this;
  }

  getMainPage = async (req, res) => {
    const categories = await this.mainPageService.readCategories();
    const posts = await this.mainPageService.readPosts();
    const mostDiscussedPosts = await this.mainPageService.readMostDiscussedPosts();
    const lastComments = await this.mainPageService.readLastComments();
    const user = await this.mainPageService.readUser();
    const helloText = await this.mainPageService.readHelloText();

    res.render(MAIN_PAGE_VIEW_PATH, {
      categories,
      posts,
      mostDiscussedPosts,
      lastComments,
      user,
      helloText,
      router: {
        href: req.originalUrl,
        query: req.query ?? {},
      },
      page: {
        id: MAIN_PAGE_ID,
        title: MAIN_PAGE_TITLE,
      },
    });
  }
}

module.exports = RootRouter;
