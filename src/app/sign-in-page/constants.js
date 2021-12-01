const path = require(`path`);

const {PageId} = require(`@app/constants`);

const SIGN_IN_PAGE_ROUTE = `/sign-in`;

const SIGN_IN_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/sign-in-page`);

const SIGN_IN_PAGE_ID = PageId.SIGN_IN;

const SIGN_IN_PAGE_TITLE = `Вход с паролем`;

module.exports = {
  SIGN_IN_PAGE_ROUTE,
  SIGN_IN_PAGE_VIEW_PATH,
  SIGN_IN_PAGE_ID,
  SIGN_IN_PAGE_TITLE,
};
