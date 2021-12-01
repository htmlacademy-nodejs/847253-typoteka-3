const pino = require(`pino`);

class Logger {
  constructor({name, level, output = process.stdout}) {
    return pino({
      name,
      level,
      prettyPrint: true,
    }, pino.destination(output));
  }
}

module.exports = Logger;
