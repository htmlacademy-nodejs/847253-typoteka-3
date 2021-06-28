'use strict';

const chalk = require(`chalk`);

const {ExitCode} = require(`../../../constants`);
const {
  FILE_NAME,
  POSTS_MIN_AMOUNT,
  POSTS_MAX_AMOUNT,
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  TITLES_FILE_PATH,
} = require(`./constants`);
const {generatePosts, writeJsonToFile, readFile} = require(`./utils`);

module.exports = {
  name: `--generate`,
  async run(args) {
    let [amount] = args;
    amount = Number.parseInt(amount, 10);

    if (Number.isNaN(amount)) {
      console.error(
        chalk.red(`Параметр "amount" обязательный`)
      );
      process.exit(ExitCode.error);
    } else if (amount > POSTS_MAX_AMOUNT || amount < POSTS_MIN_AMOUNT) {
      console.error(
        chalk.red(`Параметр "amount" не может быть меньше ${POSTS_MIN_AMOUNT} или больше ${POSTS_MAX_AMOUNT}`)
      );
      process.exit(ExitCode.error);
    }

    const sentences = await readFile(SENTENCES_FILE_PATH);
    const categories = await readFile(CATEGORIES_FILE_PATH);
    const titles = await readFile(TITLES_FILE_PATH);

    await writeJsonToFile(FILE_NAME, generatePosts(amount, {sentences, categories, titles}));
  }
};
