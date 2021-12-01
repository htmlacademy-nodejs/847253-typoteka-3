const path = require(`path`);

const CONFIG = {
  /*
   * Порт, на котором запускается приложение
   */
  APP_PORT: process.env.APP_PORT ?? 8080,
  API_URL: process.env.API_URL ?? `http://localhost:8081/api`,
  /*
   * Уровень логирования
   */
  LOG_LEVEL: process.env.LOG_LEVEL ?? `debug`,
  /*
   * Путь файла с логами
   */
  LOGGER_OUTPUT_PATH: process.env.LOGGER_OUTPUT_PATH,
};

module.exports = CONFIG;
