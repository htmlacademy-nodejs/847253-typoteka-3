const chalk = require(`chalk`);

const fixturesCommandHandler = require(`./fixtures`);
const versionCommandHandler = require(`./version`);

const OUTPUT_COLOR_HEX = `#969696`;

const commandHandler = {
  name: `help`,
  help: `node index.js --help - показывает это сообщение`,
  run() {
    const text = `    Модуль командной строки

    Использование: node index.js --<command>

    Где <command> это один из вариантов:
    ${[fixturesCommandHandler.name, versionCommandHandler.name, this.name].join(`, `)}

    ${[fixturesCommandHandler.help, versionCommandHandler.help, this.help].join(`\n    `)}`;

    console.info(
        chalk.hex(OUTPUT_COLOR_HEX)(text)
    );
  }
};

module.exports = commandHandler;
