'use strict';

/**
 * Команда по умолчанию
 *
 * @readonly
 * @type {string}
 */
const DEFAULT_COMMAND = `help`;

/**
 * Индекс в массиве аргументов, с которого начинаются аргументы для главной команды
 *
 * @readonly
 * @type {number}
 */
const USER_ARGV_INDEX = 2;

/**
 * Индекс в массиве аргументов, с которого начинаются аргументы подкоманды
 *
 * @readonly
 * @typedef {number}
 */
const COMMAND_ARGV_INDEX = 3;

/**
 * Код завершения
 *
 * @readonly
 * @type {{ERROR: 1, SUCCESS: 2}}
 */
const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  COMMAND_ARGV_INDEX,
  ExitCode,
};
