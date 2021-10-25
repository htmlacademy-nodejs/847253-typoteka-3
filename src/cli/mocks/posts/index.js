const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);
const {getRandomArrayValue, createAndFillArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

const {generateText} = require(`../utils`);

const {
  DATE_MAX_UNIX_TIME_STAMP,
  DATE_MIN_UNIX_TIME_STAMP,
  TEXT_SENTENCES_MIN_AMOUNT,
  TEXT_SENTENCES_MAX_AMOUNT,
  CATEGORIES_MIN_AMOUNT,
  CATEGORIES_MAX_AMOUNT,
  TEXT_SENTENCES_PATH,
  COMMENTS_MIN_AMOUNT,
  COMMENTS_MAX_AMOUNT,
  TITLES_PATH,
} = require(`./constants`);
const {readFile} = require(`../utils`);

/**
 * Предложения, из которых будет сформирован текст и текст для предпросмотра
 *
 * @readonly
 * @type {string[]}
 */
const textSentences = readFile(TEXT_SENTENCES_PATH);

/**
 * Заголовки
 *
 * @readonly
 * @type {string[]}
 */
const titles = readFile(TITLES_PATH);

/**
 * Генерирует запись
 *
 * @return {Object} Запись
 */
const generatePost = () => ({
  id: nanoid(NANOID_ID_MAX_LENGTH),
  title: getRandomArrayValue(titles),
  date: new Date(generateRandomNumber(DATE_MIN_UNIX_TIME_STAMP, DATE_MAX_UNIX_TIME_STAMP)).toISOString(),
  previewText: generateText(textSentences, generateRandomNumber(TEXT_SENTENCES_MIN_AMOUNT, TEXT_SENTENCES_MAX_AMOUNT)),
  text: generateText(textSentences, generateRandomNumber(TEXT_SENTENCES_MIN_AMOUNT, TEXT_SENTENCES_MAX_AMOUNT)),
  categories: createAndFillArray(
      generateRandomNumber(CATEGORIES_MIN_AMOUNT, CATEGORIES_MAX_AMOUNT),
      () => nanoid(NANOID_ID_MAX_LENGTH)
  ),
  comments: createAndFillArray(
      generateRandomNumber(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT),
      () => nanoid(NANOID_ID_MAX_LENGTH)
  ),
});

/**
 * Генерирует записи в заданном количестве
 *
 * @param {number} amount Количество записей
 * @return {Object[]} Записи
 */
const generatePosts = (amount) => createAndFillArray(
    amount,
    generatePost
);

module.exports = generatePosts;
