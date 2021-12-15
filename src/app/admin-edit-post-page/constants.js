const path = require(`path`);

const {PageId} = require(`@app/constants`);

const ADMIN_EDIT_POST_PAGE_ROUTE = `/my/posts/:postId`;

const ADMIN_EDIT_POST_PAGE_VIEW_PATH = path.resolve(__dirname, `../views/pages/admin-post-page/admin-post-page`);

const ADMIN_EDIT_POST_PAGE_ID = PageId.ADMIN_EDIT_POST;

const ADMIN_EDIT_POST_PAGE_TITLE = `Редактирование записи - Панель управления`;

module.exports = {
  ADMIN_EDIT_POST_PAGE_ROUTE,
  ADMIN_EDIT_POST_PAGE_VIEW_PATH,
  ADMIN_EDIT_POST_PAGE_ID,
  ADMIN_EDIT_POST_PAGE_TITLE,
};
