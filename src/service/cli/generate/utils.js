`use strict`;

const fs = require(`fs`).promises;

const chalk = require(`chalk`);

const {
  generateRandomNumber,
  getRandomArrayValue,
  shuffleArray,
  createAndFillArray,
} = require(`../../../../src/utils`);
const {
  CREATE_DATE_MAX_UNIX_TIME_STAMP,
  CREATE_DATE_MIN_UNIX_TIME_STAMP,
  TEXT_SENTENCES_MAX_AMOUNT,
  CATEGORIES_MAX_AMOUNT,
} = require(`./constants`);

const writeJsonToFile = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data));

    console.info(
      chalk.green(`Данные успешно записаны в "${path}"`)
    );
  } catch (error) {
    console.error(
      chalk.red(`Не удалось произвести запись в "${path}"\n\n${error}`)
    );

    throw error;
  }
};

const readFile = async (path) => {
  try {
    return (await fs.readFile(path))
      .toString()
      .split(`\n`)
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error(
      chalk.red(`Не удалось прочитать файл "${path}"\n\n${error}`)
    );

    throw error;
  }
};

const generateText = (sentences) => shuffleArray(sentences)
  .slice(0, TEXT_SENTENCES_MAX_AMOUNT)
  .join(` `);

const generateCategories = (categories) => {
  const shuffledCategories = shuffleArray(categories);
  const maxCategoriesAmount = Math.min(categories.length, CATEGORIES_MAX_AMOUNT);
  const randomCategoriesAmount = generateRandomNumber(1, maxCategoriesAmount);

  return shuffledCategories.slice(0, randomCategoriesAmount);
};

const generatePost = (sentences, categories, titles) => ({
  title: getRandomArrayValue(titles),
  createDate: new Date(generateRandomNumber(CREATE_DATE_MIN_UNIX_TIME_STAMP, CREATE_DATE_MAX_UNIX_TIME_STAMP)),
  announce: generateText(sentences),
  fullText: generateText(sentences),
  categories: generateCategories(categories),
});

const generatePosts = (amount, {sentences, categories, titles}) =>
  createAndFillArray(amount, () => generatePost(sentences, categories, titles));

module.exports = {generatePosts, writeJsonToFile, readFile};
