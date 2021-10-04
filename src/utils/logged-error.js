'use strict';

const chalk = require(`chalk`);

class LoggedError extends Error {
  /**
   * @param {string} [message]
   * @return {void}
   */
  constructor(message) {
    super(message);

    /**
     * @type {Console}
     */
    this.logger = console;

    this.log();
  }

  /**
   * @return {void}
   */
  log() {
    this.logger.error(chalk.red(this.message));
  }
}

module.exports = LoggedError;
