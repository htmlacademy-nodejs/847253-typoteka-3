const RootLogger = require(`@root/src/utils/logger`);

const CONFIG = require(`@api/config`);

class Logger extends RootLogger {
  constructor({name}) {
    super({
      name,
      level: CONFIG.LOG_LEVEL,
      output: CONFIG.LOGGER_OUTPUT_PATH,
    });
  }
}

module.exports = Logger;
