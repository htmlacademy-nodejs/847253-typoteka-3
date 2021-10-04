'use strict';

const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/posts/category/:id`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/posts-by-category-page/posts-by-category-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.POSTS_BY_CATEGORY;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Записи по категории`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
