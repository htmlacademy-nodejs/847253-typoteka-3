const chalk = require(`chalk`);

const {ExitCode} = require(`../constants`);
const {
  MOCKS_MIN_AMOUNT,
  MOCKS_MAX_AMOUNT,
} = require(`./constants`);
const {writeJsonToFile} = require(`./utils`);
const generateCategories = require(`./categories`);
const generatePosts = require(`./posts`);

/**
 * @readonly
 * @type {Object<string, function(number): Object>}
 */
const generatorByType = {
  categories: generateCategories,
  posts: generatePosts,
};

/**
 * Обработчик команды mocks
 *
 * @readonly
 * @type {CommandHandler}
 */
const commandHandler = {
  name: `mocks`,
  help: `node index.js --mocks <type> <amount> <savePath>  - создает массив с тестовыми данными вида <type> в количестве <amount> и сохраняет их в <savePath>`,

  /**
   * @param {[string, string, string]} args
   * @return {Promise<void>}
   */
  async run(args) {
    let [type, amount, savePath] = args;

    if (type === undefined) {
      console.error(
          chalk.red(`Параметр "type" обязательный`)
      );
      process.exit(ExitCode.ERROR);
    }

    /**
     * @readonly
     * @type {function(number): Object}
     */
    const generator = generatorByType[type];


    if (generator === undefined) {
      console.error(
          chalk.red(`Отсутствует генератор для типа "${type}"`)
      );
      process.exit(ExitCode.ERROR);
    }

    /**
     * @type {number}
     */
    amount = Number.parseInt(amount, 10);

    if (Number.isNaN(amount)) {
      console.error(
          chalk.red(`Параметр "amount" обязательный`)
      );
      process.exit(ExitCode.ERROR);
    } else if (amount > MOCKS_MAX_AMOUNT || amount < MOCKS_MIN_AMOUNT) {
      console.error(
          chalk.red(`Параметр "amount" не может быть меньше ${MOCKS_MIN_AMOUNT} или больше ${MOCKS_MAX_AMOUNT}`)
      );
      process.exit(ExitCode.ERROR);
    }

    if (savePath === undefined) {
      console.error(
          chalk.red(`Параметр "savePath" обязательный`)
      );
      process.exit(ExitCode.ERROR);
    }

    await writeJsonToFile(savePath, await generator(amount));
  }
};

module.exports = commandHandler;
