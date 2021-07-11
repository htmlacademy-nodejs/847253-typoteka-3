`use strict`;

const {Router} = require(`express`);

const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => {
  res.send(`/`);
});

module.exports = rootRouter;
