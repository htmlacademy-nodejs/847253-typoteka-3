'use strict';

const chalk = require(`chalk`);

const mocksCommandHandler = require(`./mocks`);
const versionCommandHandler = require(`./version`);

/**
 * Обработчик команды "help"
 *
 * @type {CommandHandler}
 */
const commandHandler = {
  name: `help`,
  help: `node service.js --help - показывает это сообщение`,
  run() {
    const text = `    Модуль командной строки

    Использование: node index.js --<command>

    Где <command> это один из вариантов:
    ${[mocksCommandHandler.name, versionCommandHandler.name, this.name].join(`, `)}

    ${[mocksCommandHandler.help, versionCommandHandler.help, this.help].join(`\n    `)}`;

    console.info(
        chalk.gray(text)
    );
  }
};

module.exports = commandHandler;
