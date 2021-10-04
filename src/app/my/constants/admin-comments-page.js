'use strict';

const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/my/comments`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/admin-comments-page/admin-comments-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.ADMIN_COMMENTS;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Комментарии - Панель управления`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
