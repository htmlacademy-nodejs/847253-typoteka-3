const path = require(`path`);

const {PageId} = require(`@app/constants`);

const INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH = path.resolve(__dirname, `../views/pages/error-page/error-page`);

const INTERNAL_SERVER_ERROR_PAGE_ID = PageId.INTERNAL_SERVER_ERROR;

const INTERNAL_SERVER_ERROR_PAGE_TITLE = `Что-то пошло не так`;

module.exports = {
  INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH,
  INTERNAL_SERVER_ERROR_PAGE_ID,
  INTERNAL_SERVER_ERROR_PAGE_TITLE,
};
