`use strict`;

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/search`, (req, res) => {
  res.send(`/search`);
});

module.exports = searchRouter;
