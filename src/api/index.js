'use strict';

const path = require(`path`);

const express = require(`express`);
const chalk = require(`chalk`);

const {createCombinedRouter} = require(`../utils/express`);

const app = express();

const expressConfig = require(`./configs/${app.get(`env`)}/express`);

app.use(express.json());
app.use(createCombinedRouter(path.resolve(__dirname, `./routers`)));

app.listen(expressConfig.port, () => {
  console.info(chalk.green(`The API has been started on port ${expressConfig.port}`));
});
