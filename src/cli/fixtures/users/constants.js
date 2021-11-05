const path = require(`path`);

/**
 * Путь до файла с именами
 *
 * @readonly
 * @type {string}
 */
const NAMES_PATH = path.resolve(__dirname, `./names.txt`);

/**
 * Путь до фамилиями с предложениями
 *
 * @readonly
 * @type {string}
 */
const SURNAMES_PATH = path.resolve(__dirname, `./surnames.txt`);

/**
 * Путь до файла с ссылками
 *
 * @readonly
 * @type {string}
 */
const AVATARS_URLS_PATH = path.resolve(__dirname, `./avatars-urls.txt`);

/**
 * Путь до файла с ролями
 *
 * @readonly
 * @type {string}
 */
const ROLES_PATH = path.resolve(__dirname, `./roles.txt`);

module.exports = {NAMES_PATH, SURNAMES_PATH, AVATARS_URLS_PATH, ROLES_PATH};
