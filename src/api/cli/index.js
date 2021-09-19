'use strict';

const mocks = require(`./mocks`);
const help = require(`./help`);
const version = require(`./version`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  COMMAND_ARGV_INDEX,
  ExitCode,
} = require(`./constants`);

const Cli = {
  [mocks.name]: mocks,
  [help.name]: help,
  [version.name]: version,
};

const userArgs = process.argv.slice(USER_ARGV_INDEX);
const commandArgs = process.argv.slice(COMMAND_ARGV_INDEX);
const command = userArgs[0] && userArgs[0].slice(2);

if (userArgs.length === 0 || !Cli[command]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[command].run(commandArgs);
