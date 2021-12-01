const path = require(`path`);

const {PageId} = require(`@app/constants`);

const NOT_FOUND_ERROR_PAGE_ROUTE = `*`;

const NOT_FOUND_ERROR_PAGE_VIEW_PATH = path.resolve(__dirname, `../views/pages/error-page/error-page`);

const NOT_FOUND_ERROR_PAGE_ID = PageId.NOT_FOUND_ERROR;

const NOT_FOUND_ERROR_PAGE_TITLE = `Страница отсутствует`;

module.exports = {
  NOT_FOUND_ERROR_PAGE_ROUTE,
  NOT_FOUND_ERROR_PAGE_VIEW_PATH,
  NOT_FOUND_ERROR_PAGE_ID,
  NOT_FOUND_ERROR_PAGE_TITLE,
};
