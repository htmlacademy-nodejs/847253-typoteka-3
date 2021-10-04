'use strict';

const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/my/posts/new`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/admin-post-page/admin-post-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.ADMIN_NEW_POST;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Новая запись - Панель управления`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
