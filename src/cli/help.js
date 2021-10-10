const chalk = require(`chalk`);

const mocksCommandHandler = require(`./mocks`);
const versionCommandHandler = require(`./version`);


/**
 * @readonly
 * @type {string}
 */
const OUTPUT_COLOR_HEX = `#969696`;

/**
 * Обработчик команды help
 *
 * @readonly
 * @type {CommandHandler}
 */
const commandHandler = {
  name: `help`,
  help: `node index.js --help - показывает это сообщение`,
  run() {
    const text = `    Модуль командной строки

    Использование: node index.js --<command>

    Где <command> это один из вариантов:
    ${[mocksCommandHandler.name, versionCommandHandler.name, this.name].join(`, `)}

    ${[mocksCommandHandler.help, versionCommandHandler.help, this.help].join(`\n    `)}`;

    console.info(
        chalk.hex(OUTPUT_COLOR_HEX)(text)
    );
  }
};

module.exports = commandHandler;
