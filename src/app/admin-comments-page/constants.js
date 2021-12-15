const path = require(`path`);

const {PageId} = require(`@app/constants`);

const ADMIN_COMMENTS_PAGE_ROUTE = `/my/comments`;

const ADMIN_COMMENTS_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/admin-comments-page`);

const ADMIN_COMMENTS_PAGE_ID = PageId.ADMIN_COMMENTS;

const ADMIN_COMMENTS_PAGE_TITLE = `Комментарии - Панель управления`;

module.exports = {
  ADMIN_COMMENTS_PAGE_ROUTE,
  ADMIN_COMMENTS_PAGE_VIEW_PATH,
  ADMIN_COMMENTS_PAGE_ID,
  ADMIN_COMMENTS_PAGE_TITLE,
};
