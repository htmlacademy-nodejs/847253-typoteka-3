'use strict';

const path = require(`path`);

const {PageId} = require(`@app/constants`);

/**
 * @readonly
 * @type {string}
 */
const ROUTE = `/posts/:id`;

/**
 * @readonly
 * @type {string}
 */
const VIEW_PATH = path.resolve(__dirname, `../views/post-page/post-page`);

/**
 * @readonly
 * @type {string}
 */
const PAGE_ID = PageId.POST;

/**
 * @readonly
 * @type {string}
 */
const PAGE_TITLE = `Запись`;

module.exports = {ROUTE, VIEW_PATH, PAGE_ID, PAGE_TITLE};
