'use strict';

/**
 * Команда по умолчанию
 */
const DEFAULT_COMMAND = `help`;

/**
 * Индекс в массиве аргументов, с которого начинаются аргументы для главной команды
 */
const USER_ARGV_INDEX = 2;

/**
 * Индекс в массиве аргументов, с которого начинаются аргументы подкоманды
 */
const COMMAND_ARGV_INDEX = 3;

/**
 * Код завершения
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
