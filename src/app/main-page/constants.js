const path = require(`path`);

const {PageId} = require(`@app/constants`);

const MAIN_PAGE_ROUTE = `/`;

const MAIN_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/main-page`);

const MAIN_PAGE_ID = PageId.MAIN;

const MAIN_PAGE_TITLE = `Главная страница`;

module.exports = {
  MAIN_PAGE_ROUTE,
  MAIN_PAGE_VIEW_PATH,
  MAIN_PAGE_ID,
  MAIN_PAGE_TITLE,
};
