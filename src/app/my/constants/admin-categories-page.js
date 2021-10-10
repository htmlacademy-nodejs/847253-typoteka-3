const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/my/categories`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/admin-categories-page/admin-categories-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.ADMIN_CATEGORIES;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Категории - Панель управления`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
