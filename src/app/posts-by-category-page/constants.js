const path = require(`path`);

const {PageId} = require(`@app/constants`);

const POSTS_BY_CATEGORY_PAGE_ROUTE = `/posts/category/:id`;

const POSTS_BY_CATEGORY_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/posts-by-category-page`);

const POSTS_BY_CATEGORY_PAGE_ID = PageId.POSTS_BY_CATEGORY;

const POSTS_BY_CATEGORY_PAGE_TITLE = `Записи по категории`;

module.exports = {
  POSTS_BY_CATEGORY_PAGE_ROUTE,
  POSTS_BY_CATEGORY_PAGE_VIEW_PATH,
  POSTS_BY_CATEGORY_PAGE_ID,
  POSTS_BY_CATEGORY_PAGE_TITLE,
};
