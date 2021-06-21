'use strict';

const fs = require(`fs`);

const chalk = require(`chalk`);

const {
  generateRandomNumber,
  getRandomArrayValue,
  shuffleArray,
} = require(`../../../../src/utils`);

const {
  TITLES,
  CREATE_DATE_MAX_UNIX_TIME_STAMP,
  CREATE_DATE_MIN_UNIX_TIME_STAMP,
  TEXT_SENTENCES_MAX_AMOUNT,
  TEXT_SENTENCES,
  CATEGORIES_MAX_AMOUNT,
  CATEGORIES,
} = require(`./constants`);

const generateText = () => shuffleArray(TEXT_SENTENCES)
  .slice(0, TEXT_SENTENCES_MAX_AMOUNT)
  .join(` `);

const generateCategories = () => {
  const shuffledCategories = shuffleArray(CATEGORIES);
  const maxCategoriesAmount = Math.min(CATEGORIES.length, CATEGORIES_MAX_AMOUNT);
  const randomCategoriesAmount = generateRandomNumber(1, maxCategoriesAmount);

  return shuffledCategories.slice(0, randomCategoriesAmount);
};

const generatePost = () => ({
  title: getRandomArrayValue(TITLES),
  createDate: new Date(generateRandomNumber(CREATE_DATE_MIN_UNIX_TIME_STAMP, CREATE_DATE_MAX_UNIX_TIME_STAMP)),
  announce: generateText(),
  fullText: generateText(),
  categories: generateCategories(),
});

const generatePosts = (amount) => Array.from({length: amount}).map(() => generatePost());

const writeJsonToFile = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));

    console.info(
      chalk.green(`Данные успешно записаны в "/${path}"`)
    );
  } catch (error) {
    console.error(
      chalk.red(`Не удалось произвести запись в "/${path}"\n\n${error}`)
    );
    throw error;
  }
};

module.exports = {generatePosts, writeJsonToFile};
