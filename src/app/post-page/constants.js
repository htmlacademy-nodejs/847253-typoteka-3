const path = require(`path`);

const {PageId} = require(`@app/constants`);

const POST_PAGE_ROUTE = `/posts/:id`;

const POST_PAGE_VIEW_PATH = path.resolve(__dirname, `./view/post-page`);

const POST_PAGE_ID = PageId.POST;

const POST_PAGE_TITLE = `Запись`;

module.exports = {
  POST_PAGE_ROUTE,
  POST_PAGE_VIEW_PATH,
  POST_PAGE_ID,
  POST_PAGE_TITLE,
};
