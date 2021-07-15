'use strict';

const fs = require(`fs`);
const path = require(`path`);

const {Router} = require(`express`);

const combinedRouter = new Router();

const filenames = fs.readdirSync(path.resolve(__dirname));

filenames
  .filter((fileName) => fileName.endsWith(`-router.js`))
  .forEach((fileName)=> {
    const probablyRouter = require(`./` + fileName);

    if (Object.getPrototypeOf(probablyRouter) !== Router) {
      throw new Error(`The imported module "${fileName}" does not provide any instance of the Router class`);
    }

    combinedRouter.use(probablyRouter);
  });

module.exports = combinedRouter;
