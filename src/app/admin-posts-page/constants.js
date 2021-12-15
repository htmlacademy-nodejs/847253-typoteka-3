const path = require(`path`);

const {PageId} = require(`@app/constants`);

const ADMIN_POSTS_PAGE_ROUTE = `/my/posts`;

const ADMIN_POSTS_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/admin-posts-page`);

const ADMIN_POSTS_PAGE_ID = PageId.ADMIN_POSTS;

const ADMIN_POSTS_PAGE_TITLE = `Записи - Панель управления`;

module.exports = {
  ADMIN_POSTS_PAGE_ROUTE,
  ADMIN_POSTS_PAGE_VIEW_PATH,
  ADMIN_POSTS_PAGE_ID,
  ADMIN_POSTS_PAGE_TITLE,
};
