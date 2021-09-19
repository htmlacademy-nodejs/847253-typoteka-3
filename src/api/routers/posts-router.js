'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);

const {Router} = require(`express`);

const postsRouter = new Router();

postsRouter.get(`/posts`, async (req, res) => {
  try {
    const posts = await fs.readFile(path.resolve(__dirname, `../mocks/posts.json`));

    res.send(JSON.parse(posts));
  } catch (error) {
    console.error(error);

    res.send([]);
  }
});

module.exports = postsRouter;
