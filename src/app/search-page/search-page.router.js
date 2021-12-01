const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const SearchPageService = require(`./search-page.service`);

const {
  SEARCH_PAGE_ROUTE,
  SEARCH_PAGE_VIEW_PATH,
  SEARCH_PAGE_ID,
  SEARCH_PAGE_TITLE,
} = require(`./constants`);

class SearchPageRouter extends Router {
  static instance = null;

  constructor() {
    if (SearchPageRouter.instance !== null) {
      return SearchPageRouter.instance;
    }

    super();

    this.searchPageService = new SearchPageService();

    this.get(SEARCH_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getSearchPage));

    SearchPageRouter.instance = this;
  }

  getSearchPage = async (req, res) => {
    const user = await this.searchPageService.readUser();
    const searchResults = req.query.q
      ? await this.searchPageService.searchPost(encodeURI(req.query.q))
      : undefined;



    res.render(SEARCH_PAGE_VIEW_PATH, {
      searchResults,
      searchFormData: {
        q: {value: req.query.q},
      },
      user,
      router: {
        href: req.originalUrl,
      },
      page: {
        id: SEARCH_PAGE_ID,
        title: SEARCH_PAGE_TITLE,
      },
    });
  }
}

module.exports = SearchPageRouter;
