`use strict`;

const http = require(`http`);
const fs = require(`fs`).promises;

const chalk = require(`chalk`);

const {DEFAULT_PORT, ROOT_URL, FILE_NAME, HttpCode} = require(`./constants`);
const {
  createResponseSender,
  createMessageTemplate,
  createPostListTemplate,
} = require(`./utils`);

const requestListener = async (req, res) => {
  const sendResponse = createResponseSender(res);

  switch (req.url) {
    case ROOT_URL:
      try {
        const rawPosts = await fs.readFile(FILE_NAME);
        const posts = JSON.parse(rawPosts);

        const postListTemplate = createPostListTemplate(posts);

        sendResponse(HttpCode.ok, createMessageTemplate(postListTemplate));
      } catch (error) {
        console.error(chalk.red(error));
        sendResponse(HttpCode.internalServerError, createMessageTemplate(`Internal server error`));
      }

      break;
    default:
      sendResponse(HttpCode.notFound, createMessageTemplate(`Not found`));
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(requestListener)
      .listen(port)
      .on(`listening`, (error) => {
        if (error) {
          return console.error(chalk.red(`Ошибка при создании сервера`, error));
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  }
};
