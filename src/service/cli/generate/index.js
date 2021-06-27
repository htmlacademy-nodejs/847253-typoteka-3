'use strict';

const chalk = require(`chalk`);

const {ExitCode} = require(`../../../constants`);
const {FILE_NAME, POSTS_MIN_AMOUNT, POSTS_MAX_AMOUNT} = require(`./constants`);
const {generatePosts, writeJsonToFile} = require(`./utils`);

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

    await writeJsonToFile(FILE_NAME, generatePosts(amount));
  }
};
