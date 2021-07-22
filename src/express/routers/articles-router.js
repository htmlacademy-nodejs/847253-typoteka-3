`use strict`;

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/articles/:id`, (req, res) => {
  res.send(`/articles/${req.params.id}`);
});

articlesRouter.get(`/articles/category/:id`, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

articlesRouter.get(`/articles/add`, (req, res) => {
  res.send(`/articles/add`);
});

articlesRouter.get(`/articles/edit`, (req, res) => {
  res.send(`/articles/edit`);
});

module.exports = articlesRouter;
