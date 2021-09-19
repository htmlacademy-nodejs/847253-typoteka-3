'use strict';

const FILE_NAME = `./mocks.json`;

/**
 * Верхняя граница даты создания записи
 */
const DATE_MAX_UNIX_TIME_STAMP = Date.now();

/**
 * Один месяц в миллисекундах
 */
const ONE_MONTH_UNIX_TIME_STAMP = 2670658033;

/**
 * Нижняя граница даты создания записи
 */
const DATE_MIN_UNIX_TIME_STAMP = DATE_MAX_UNIX_TIME_STAMP - ONE_MONTH_UNIX_TIME_STAMP * 3;

/**
 * Максимальное количество предложений в тексте записи
 */
const TEXT_SENTENCES_MAX_AMOUNT = 5;

/**
 * Максимальное количество категорий у записи
 */
const CATEGORIES_MAX_AMOUNT = 3;

/**
 * Путь до файла с исходными данными для текста записи
 */
const SENTENCES_FILE_PATH = `./sentences.txt`;

/**
 * Путь до файла с исходными данными для категорий записи
 */
const CATEGORIES_FILE_PATH = `./categories.txt`;

/**
 * Путь до файла с исходными данными для заголовка записи
 */
const TITLES_FILE_PATH = `./titles.txt`;

module.exports = {
  FILE_NAME,
  DATE_MAX_UNIX_TIME_STAMP,
  DATE_MIN_UNIX_TIME_STAMP,
  TEXT_SENTENCES_MAX_AMOUNT,
  CATEGORIES_MAX_AMOUNT,
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  TITLES_FILE_PATH,
};
