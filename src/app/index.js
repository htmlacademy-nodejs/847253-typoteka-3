'use strict';

const path = require(`path`);

const express = require(`express`);
const chalk = require(`chalk`);

const {createCombinedRouter} = require(`../utils/express`);
require(`./pug`);

const app = express();

const expressConfig = require(`./configs/${app.get(`env`)}/express`);

app.set(`views`, path.resolve(__dirname, expressConfig.views));
app.set(`view engine`, expressConfig.viewEngine);

app[expressConfig.viewCache ? `enable` : `disable`](`view cache`);

app.use(express.static(path.resolve(__dirname, expressConfig.public)));
app.use(createCombinedRouter(path.resolve(__dirname, `./routers`)));

app.listen(expressConfig.port, () => {
  console.info(chalk.green(`The app has been started on port ${expressConfig.port}`));
});
