const path = require(`path`);

const {shuffleArray, getRandomArrayValue, createAndFillArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

const {
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  TITLES_FILE_PATH,
  TEXT_SENTENCES_MAX_AMOUNT,
  CATEGORIES_MAX_AMOUNT,
  DATE_MAX_UNIX_TIME_STAMP,
  DATE_MIN_UNIX_TIME_STAMP,
} = require(`./constants`);
const {readFile} = require(`../utils`);

/**
 * Генерирует сплошной текст на основе исходного массива с предложениями
 *
 * @param {string[]} sentences
 * @return {string}
 */
const generateText = (sentences) => shuffleArray(sentences)
  .slice(0, TEXT_SENTENCES_MAX_AMOUNT)
  .join(` `);

/**
 * Генерирует массив случайных категорий на основе исходного массива категорий
 *
 * @template T
 * @param {T[]} categories
 * @return {T[]}
 */
const generateCategories = (categories) => {
  const shuffledCategories = shuffleArray(categories);
  const maxCategoriesAmount = Math.min(categories.length, CATEGORIES_MAX_AMOUNT);
  const randomCategoriesAmount = generateRandomNumber(1, maxCategoriesAmount);

  return shuffledCategories.slice(0, randomCategoriesAmount);
};

/**
 * Генерирует запись на основе передаваемых исходных данных
 *
 * @param {string[]} sentences Предложения, из которых будет сформирован текст и текст для предпросмотра
 * @param {string[]} categories Названия категорий, из которых случайным образом будут выбранные некоторые
 * @param {string[]} titles Заголовки, их которых случайным образом будет выбран один
 * @return {Post} Запись
 */
const generatePost = (sentences, categories, titles) => ({
  title: getRandomArrayValue(titles),
  date: new Date(generateRandomNumber(DATE_MIN_UNIX_TIME_STAMP, DATE_MAX_UNIX_TIME_STAMP)),
  previewText: generateText(sentences),
  text: generateText(sentences),
  categories: generateCategories(categories),
});

/**
 * Генерирует записи в заданном количестве
 *
 * @param {number} amount Количество записей
 * @param {{sentences: string[], categories: string[], titles: string[]}} data
 * @return {Post[]} Записи
 */
const generatePosts = (amount, {sentences, categories, titles}) =>
  createAndFillArray(amount, () => generatePost(sentences, categories, titles));

/**
 * Читает исходные данные из текстовых файлов и передает их в {@link generatePosts}
 *
 * @param {number} amount Количество записей
 * @return {Post[]} Записи
 */
module.exports = async (amount) => {
  const sentences = await readFile(path.resolve(__dirname, SENTENCES_FILE_PATH));
  const categories = await readFile(path.resolve(__dirname, CATEGORIES_FILE_PATH));
  const titles = await readFile(path.resolve(__dirname, TITLES_FILE_PATH));

  return generatePosts(amount, {sentences, categories, titles});
};
