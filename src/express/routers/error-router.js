'use strict';

const {Router} = require(`express`);

const {PageId} = require(`./constants`);

const errorRouter = new Router();

errorRouter.get(`/error`, (req, res) => {
  res.render(`pages/error-page/error-page`, {
    router: {
      path: `/error`,
    },
    page: {
      id: PageId.ERROR,
      title: `Ошибка`
    },
    error: {
      code: `404`,
      title: `Что-то пошло не так`,
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });
});

module.exports = errorRouter;
