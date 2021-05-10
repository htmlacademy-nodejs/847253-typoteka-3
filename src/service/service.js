'use strict';

const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  COMMAND_ARGV_INDEX,
  ExitCode,
} = require(`../constants`);

const userArgs = process.argv.slice(USER_ARGV_INDEX);
const commandArgs = process.argv.slice(COMMAND_ARGV_INDEX);
const [command] = userArgs;

if (userArgs.length === 0 || !Cli[command]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[command].run(commandArgs);
