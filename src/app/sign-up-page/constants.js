const path = require(`path`);

const {PageId} = require(`@app/constants`);

const SIGN_UP_PAGE_ROUTE = `/sign-up`;

const SIGN_UP_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/sign-up-page`);

const SIGN_UP_PAGE_ID = PageId.SIGN_UP;

const SIGN_UP_PAGE_TITLE = `Регистрация`;

module.exports = {
  SIGN_UP_PAGE_ROUTE,
  SIGN_UP_PAGE_VIEW_PATH,
  SIGN_UP_PAGE_ID,
  SIGN_UP_PAGE_TITLE,
};
