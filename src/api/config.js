const path = require(`path`);

const CONFIG = {
  /*
   * Порт, на котором запускается приложение
   */
  API_PORT: process.env.API_PORT ?? 8081,
  /*
   * Уровень логирования
   */
  LOG_LEVEL: process.env.LOG_LEVEL ?? `debug`,
  /*
   * Окружение
   */
  ENV: process.env.NODE_ENV ?? `development`,
  /*
   * Путь файла с логами
   */
  LOGGER_OUTPUT_PATH: process.env.LOGGER_OUTPUT_PATH,
  /*
   * URL web-приложения
   */
  APP_URL: process.env.APP_URL ?? `http://localhost:8080`,
};

module.exports = CONFIG;
