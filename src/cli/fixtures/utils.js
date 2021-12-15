const fs = require(`fs`);

const chalk = require(`chalk`);

const {shuffleArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

/*
 * Записывает JSON в файл
 */
const writeJsonToFile = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));

    console.info(
        chalk.green(`Данные успешно записаны в '${path}'`)
    );
  } catch (error) {
    console.error(
        chalk.red(`Не удалось произвести запись в '${path}'`)
    );

    throw error;
  }
};

/*
 * Читает файл
 */
const readFile = (path) => {
  try {
    return fs.readFileSync(path)
      .toString()
      .split(`\n`)
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error(
        chalk.red(`Не удалось прочитать файл '${path}'\n${error}`)
    );

    throw error;
  }
};

/*
 * Генерирует сплошной текст на основе исходного массива с предложениями
 */
const generateText = (sentences, sentencesMaxAmount) => {
  const clampedSentencesMaxAmount = Math.min(sentences.length, sentencesMaxAmount);

  const textSentencesRandomAmount = generateRandomNumber(1, clampedSentencesMaxAmount);

  return shuffleArray(sentences)
    .slice(0, textSentencesRandomAmount)
    .join(` `);
};

module.exports = {writeJsonToFile, readFile, generateText};
