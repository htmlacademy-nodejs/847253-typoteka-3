`use strict`;

const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/login`, (req, res) => {
  res.send(`/login`);
});

module.exports = loginRouter;
