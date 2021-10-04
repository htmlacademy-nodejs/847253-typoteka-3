'use strict';

const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/my/posts`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/admin-posts-page/admin-posts-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.ADMIN_POSTS;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Записи - Панель управления`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
