const path = require(`path`);

const {PageId} = require(`@app/constants`);

const ADMIN_NEW_POST_PAGE_ROUTE = `/my/posts/new`;

const ADMIN_NEW_POST_PAGE_VIEW_PATH = path.resolve(__dirname, `../views/pages/admin-post-page/admin-post-page`);

const ADMIN_NEW_POST_PAGE_ID = PageId.ADMIN_NEW_POST;

const ADMIN_NEW_POST_PAGE_TITLE = `Новая запись - Панель управления`;

module.exports = {
  ADMIN_NEW_POST_PAGE_ROUTE,
  ADMIN_NEW_POST_PAGE_VIEW_PATH,
  ADMIN_NEW_POST_PAGE_ID,
  ADMIN_NEW_POST_PAGE_TITLE,
};
