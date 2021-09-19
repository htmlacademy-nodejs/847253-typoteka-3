'use strict';

const {Router} = require(`express`);

const PageId = require(`../constants/page-id`);

const signUpRouter = new Router();

signUpRouter.get(`/sign-up`, (req, res) => {
  res.render(`pages/sign-up-page/sign-up-page`, {
    router: {
      path: `/sign-up`,
    },
    page: {
      id: PageId.SIGN_UP,
      title: `Регистрация`,
    },
  });
});

module.exports = signUpRouter;
