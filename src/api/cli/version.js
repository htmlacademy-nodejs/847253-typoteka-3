'use strict';

const chalk = require(`chalk`);

const packageJsonFile = require(`../../../package.json`);

/**
 * Обработчик команды "version"
 *
 * @type {CommandHandler}
 */
const commandHandler = {
  name: `version`,
  help: `node service.js --version - показывает версию программы`,
  run() {
    console.info(
        chalk.blue(packageJsonFile.version)
    );
  }
};

module.exports = commandHandler;
