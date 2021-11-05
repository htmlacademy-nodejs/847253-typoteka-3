const fs = require(`fs`);

const chalk = require(`chalk`);

const {shuffleArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

/**
 * Записывает JSON в файл
 *
 * @param {string} path Путь, включая имя файла и его расширение
 * @param {string} data Данные, подлежащие сохранению
 * @return {void}
 */
const writeJsonToFile = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));

    console.info(
        chalk.green(`Данные успешно записаны в "${path}"`)
    );
  } catch (error) {
    console.error(
        chalk.red(`Не удалось произвести запись в "${path}"`)
    );

    throw error;
  }
};

/**
 * Читает файл
 *
 * @param {string} path Путь, включая имя файла и его расширение
 * @return {string[]} Содержимое файла
 */
const readFile = (path) => {
  try {
    return fs.readFileSync(path)
      .toString()
      .split(`\n`)
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error(
        chalk.red(`Не удалось прочитать файл "${path}"\n${error}`)
    );

    throw error;
  }
};

/**
 * Генерирует сплошной текст на основе исходного массива с предложениями
 *
 * @param {string[]} sentences
 * @param {number} sentencesMaxAmount
 * @return {string}
 */
const generateText = (sentences, sentencesMaxAmount) => {
  /**
   * @readonly
   * @type {number}
   */
  const clampedSentencesMaxAmount = Math.min(sentences.length, sentencesMaxAmount);

  /**
   * @readonly
   * @type {number}
   */
  const textSentencesRandomAmount = generateRandomNumber(1, clampedSentencesMaxAmount);

  return shuffleArray(sentences)
    .slice(0, textSentencesRandomAmount)
    .join(` `);
};

module.exports = {writeJsonToFile, readFile, generateText};
