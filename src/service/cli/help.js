'use strict';

module.exports = {
  name: `--help`,
  run() {
    const text = `
    Генератор тестовых данных

    Использование: node service.js --<command>

    Где <command> это один из вариантов:
    version, help, generate

    node service.js --version           показывает версию программы
    node service.js --generate <amount> массив с тестовыми данными в количестве <amount> и сохраняет их в файл mocks.json в корневую директорию проекта
    node service.js --help              показывает это сообщение
    `;

    console.log(text);
  }
};
