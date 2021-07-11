`use strict`;

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/register`, (req, res) => {
  res.send(`/register`);
});

module.exports = registerRouter;
