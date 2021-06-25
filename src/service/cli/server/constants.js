`use strict`;

const DEFAULT_PORT = 3000;

const ROOT_URL = `/`;

const FILE_NAME = `./mocks.json`;

const HttpCode = {
  ok: 200,
  notFound: 404,
  internalServerError: 500,
  forbidden: 403,
  unauthorized: 401,
};

module.exports = {
  DEFAULT_PORT,
  ROOT_URL,
  FILE_NAME,
  HttpCode,
};
