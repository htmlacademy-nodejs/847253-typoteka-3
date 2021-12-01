const path = require(`path`);

const {PageId} = require(`@app/constants`);

const ADMIN_CATEGORIES_PAGE_ROUTE = `/my/categories`;

const ADMIN_CATEGORIES_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/admin-categories-page`);

const ADMIN_CATEGORIES_PAGE_ID = PageId.ADMIN_CATEGORIES;

const ADMIN_CATEGORIES_PAGE_TITLE = `Категории - Панель управления`;

module.exports = {
  ADMIN_CATEGORIES_PAGE_ROUTE,
  ADMIN_CATEGORIES_PAGE_VIEW_PATH,
  ADMIN_CATEGORIES_PAGE_ID,
  ADMIN_CATEGORIES_PAGE_TITLE,
};
