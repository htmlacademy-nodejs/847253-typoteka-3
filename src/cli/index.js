const fixtures = require(`./fixtures`);
const help = require(`./help`);
const version = require(`./version`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  COMMAND_ARGV_INDEX,
  ExitCode,
} = require(`./constants`);

/**
 * @readonly
 * @type {Object<string, CommandHandler>}
 */
const Cli = {
  [fixtures.name]: fixtures,
  [help.name]: help,
  [version.name]: version,
};

/**
 * Аргументы для главной команды, переданные Node.js
 * @readonly
 * @type {string[]}
 *
 * @example
 * ['--command', 'commandArgument1', 'commandArgument2'];
 */
const userArgs = process.argv.slice(USER_ARGV_INDEX);

/**
 * Аргументы подкоманды
 *
 * @readonly
 * @type {string[]}
 *
 * @example
 * ['commandArgument1', 'commandArgument2'];
 */
const commandArgs = process.argv.slice(COMMAND_ARGV_INDEX);

/**
 * Команда
 *
 * Примечание: Используем метод строки slice, так как передаем имя команды с двумя тире - '--command'
 * @type {string}
 */
const command = userArgs[0] && userArgs[0].slice(2);

if (userArgs.length === 0 || !Cli[command]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[command].run(commandArgs);
