const path = require(`path`);

/**
 * Путь до файла с именами
 *
 * @readonly
 * @type {string}
 */
const NAMES_PATH = path.resolve(__dirname, `./names.txt`);

module.exports = {NAMES_PATH};
