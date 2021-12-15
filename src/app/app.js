const path = require(`path`);

const express = require(`express`);

const {Environment} = require(`@root/src/constants`);

const CONFIG = require(`@app/config`);
const {Logger} = require(`@app/utils`);

const contentSecurityPolicy = require(`./content-security-policy`);
const NotFoundErrorPageRouter = require(`./not-found-error-page`);
const PostPageRouter = require(`./post-page`);
const PostsByCategoryPageRouter = require(`./posts-by-category-page`);
const MainPageRouter = require(`./main-page`);
const AdminCategoriesPageRouter = require(`./admin-categories-page`);
const AdminCommentsPageRouter = require(`./admin-comments-page`);
const AdminNewPostPageRouter = require(`./admin-new-post-page`);
const AdminEditPostPageRouter = require(`./admin-edit-post-page`);
const AdminPostsPageRouter = require(`./admin-posts-page`);
const SearchPageRouter = require(`./search-page`);
const SignInPageRouter = require(`./sign-in-page`);
const SignUpPageRouter = require(`./sign-up-page`);
const handleInternalServerError = require(`./internal-server-error-page`);

require(`./pug`);

const VIEW_ENGINE = `pug`;
const PUBLIC_PATH = path.resolve(__dirname, `./public`);

class App {
  static instance = null;

  constructor() {
    if (App.instance !== null) {
      return App.instance;
    }

    this.logger = new Logger({name: `App`});

    this.express = express();

    this.express.use(express.json());
    this.express.use(express.urlencoded());
    this.express.use(express.static(PUBLIC_PATH));
    // this.express.use(this.setContentSecurityPolicy);
    this.express.use(new AdminCategoriesPageRouter());
    this.express.use(new AdminCommentsPageRouter());
    this.express.use(new AdminNewPostPageRouter());
    this.express.use(new AdminEditPostPageRouter());
    this.express.use(new AdminPostsPageRouter());
    this.express.use(new PostPageRouter());
    this.express.use(new PostsByCategoryPageRouter());
    this.express.use(new MainPageRouter());
    this.express.use(new SearchPageRouter());
    this.express.use(new SignInPageRouter());
    this.express.use(new SignUpPageRouter());
    this.express.use(new NotFoundErrorPageRouter());
    this.express.use(handleInternalServerError);

    this.express.set(`view engine`, VIEW_ENGINE);

    this.express[
      this.express.get(`env`) === Environment.PRODUCTION
        ? `enable`
        : `disable`
    ](`view cache`);

    App.instance = this;
  }

  handleExpressListen = (error) => {
    if (error) {
      this.logger.error(error);

      return;
    }

    this.logger.info(`The app has been started on port ${CONFIG.APP_PORT}`);
  }

  start = () => {
    this.express.listen(CONFIG.APP_PORT, this.handleExpressListen);
  }

  setContentSecurityPolicy = (_, res, next) => {
    res.setHeader(
        `Content-Security-Policy`,
        contentSecurityPolicy.toString(),
    );
    next();
  }
}

module.exports = App;
