`use strict`;

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const COMMAND_ARGV_INDEX = 3;

const ExitCode = {
  error: 1,
  success: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  COMMAND_ARGV_INDEX,
  ExitCode,
};
