const path = require(`path`);

/**
 * Верхняя граница даты создания записи
 *
 * @readonly
 * @type {number}
 */
const DATE_MAX_UNIX_TIME_STAMP = Date.now();

/**
 * Один месяц в миллисекундах
 *
 * @readonly
 * @type {number}
 */
const ONE_MONTH_UNIX_TIME_STAMP = 2670658033;

/**
 * Нижняя граница даты создания записи
 *
 * @readonly
 * @type {number}
 */
const DATE_MIN_UNIX_TIME_STAMP = DATE_MAX_UNIX_TIME_STAMP - ONE_MONTH_UNIX_TIME_STAMP * 3;

/**
 * Минимальное количество предложений в тексте записи
 *
 * @readonly
 * @type {number}
 */
const TEXT_SENTENCES_MIN_AMOUNT = 5;

/**
 * Максимальное количество предложений в тексте записи
 *
 * @readonly
 * @type {number}
 */
const TEXT_SENTENCES_MAX_AMOUNT = 5;

/**
 * Минимальное количество категорий у записи
 *
 * @readonly
 * @type {number}
 */
const CATEGORIES_MIN_AMOUNT = 1;

/**
 * Максимальное количество категорий у записи
 *
 * @readonly
 * @type {number}
 */
const CATEGORIES_MAX_AMOUNT = 3;

/**
 * Минимальное количество комментариев у записи
 *
 * @readonly
 * @type {number}
 */
const COMMENTS_MIN_AMOUNT = 0;

/**
 * Максимальное количество комментариев у записи
 *
 * @readonly
 * @type {number}
 */
const COMMENTS_MAX_AMOUNT = 5;

/**
 * Путь до файла с исходными данными для текста записи
 *
 * @readonly
 * @type {string}
 */
const TEXT_SENTENCES_PATH = path.resolve(__dirname, `./text-sentences.txt`);

/**
 * Путь до файла с исходными данными для заголовка записи
 *
 * @readonly
 * @type {string}
 */
const TITLES_PATH = path.resolve(__dirname, `./titles.txt`);

module.exports = {
  DATE_MAX_UNIX_TIME_STAMP,
  DATE_MIN_UNIX_TIME_STAMP,
  TEXT_SENTENCES_MIN_AMOUNT,
  TEXT_SENTENCES_MAX_AMOUNT,
  CATEGORIES_MIN_AMOUNT,
  CATEGORIES_MAX_AMOUNT,
  COMMENTS_MIN_AMOUNT,
  COMMENTS_MAX_AMOUNT,
  TEXT_SENTENCES_PATH,
  TITLES_PATH,
};
