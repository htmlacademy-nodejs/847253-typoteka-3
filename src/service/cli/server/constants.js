`use strict`;

const DEFAULT_PORT = 3000;

const ROOT_URL = `/`;

const FILE_NAME = `./mocks.json`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_PORT,
  ROOT_URL,
  FILE_NAME,
  HttpCode,
};
