'use strict';

const {Router} = require(`express`);

const {PageId} = require(`./constants`);

const searchRouter = new Router();

searchRouter.get(`/search`, (req, res) => {
  res.render(`pages/search-page/search-page`, {
    router: {
      path: `/search`,
    },
    page: {
      id: PageId.SEARCH,
      title: `Поиск`,
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });
});

module.exports = searchRouter;
