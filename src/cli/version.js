'use strict';

const chalk = require(`chalk`);

const packageJsonFile = require(`@root/package.json`);

/**
 * Обработчик команды version
 *
 * @readonly
 * @type {CommandHandler}
 */
const commandHandler = {
  name: `version`,
  help: `node index.js --version - показывает версию программы`,
  run() {
    console.info(
        chalk.blue(packageJsonFile.version)
    );
  }
};

module.exports = commandHandler;
