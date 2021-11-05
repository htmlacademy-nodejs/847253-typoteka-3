const path = require(`path`);

/**
 * @readonly
 * @type {Object}
 */
const CONFIG = {
  /**
   * Порт, на котором запускается приложение
   *
   * @type {number}
   */
  API_PORT: process.env.API_PORT ?? 8081,
  /**
   * Уровень логирования
   *
   * @type {LogLevel}
   */
  LOG_LEVEL: process.env.LOG_LEVEL ?? `debug`,
  /**
   * Окружение
   *
   * @type {Environment}
   */
  ENV: process.env.NODE_ENV ?? `development`,
  /**
   * Путь файла с логами
   *
   * @type {string}
   */
  LOGGER_OUTPUT_PATH: path.resolve(__dirname, `./logs/log.log`),
};

module.exports = CONFIG;
