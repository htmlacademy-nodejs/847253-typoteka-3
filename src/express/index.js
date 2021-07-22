`use strict`;

const express = require(`express`);
const chalk = require(`chalk`);

const combinedRouter = require(`./routers`);

const APP_PORT = 8080;

const app = express();

app.use(combinedRouter);

app.listen(APP_PORT, () => {
  console.info(chalk.green(`The app has been started on port ${APP_PORT}`));
});
