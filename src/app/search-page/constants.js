const path = require(`path`);

const {PageId} = require(`@app/constants`);

const SEARCH_PAGE_ROUTE = `/search`;

const SEARCH_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/search-page`);

const SEARCH_PAGE_ID = PageId.SEARCH;

const SEARCH_PAGE_TITLE = `Поиск`;

module.exports = {
  SEARCH_PAGE_ROUTE,
  SEARCH_PAGE_VIEW_PATH,
  SEARCH_PAGE_ID,
  SEARCH_PAGE_TITLE,
};
