'use strict';

const path = require(`path`);

const express = require(`express`);
const pug = require(`pug`);
const chalk = require(`chalk`);

const combinedRouter = require(`./routers`);
const {filterSass} = require(`./pug-filters`);

const APP_PORT = 8080;

const app = express();

app.set(`views`, path.resolve(__dirname, `views`));
app.set(`view engine`, `pug`);
app.disable(`view cache`);
pug.filters.sass = filterSass;

app.use(express.static(path.resolve(__dirname, `public`)));
app.use(combinedRouter);

app.listen(APP_PORT, () => {
  console.info(chalk.green(`The app has been started on port ${APP_PORT}`));
});
