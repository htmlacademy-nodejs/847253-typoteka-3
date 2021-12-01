const chalk = require(`chalk`);

const packageJsonFile = require(`@root/package.json`);

const commandHandler = {
  name: `version`,
  help: `node index.js --version - показывает версию программы`,
  run() {
    console.info(
        chalk.blue(packageJsonFile.version)
    );
  }
};

module.exports = commandHandler;
