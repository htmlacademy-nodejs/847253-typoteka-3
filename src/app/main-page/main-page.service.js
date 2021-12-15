const ApiService = require(`@app/api`);

const {getRandomArrayValue, createAndFillArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

const MOST_DISCUSSED_POSTS_AMOUNT = 4;
const LAST_COMMENTS_AMOUNT = 4;

class MainPageService {
  static instance = null;

  constructor() {
    if (MainPageService.instance !== null) {
      return MainPageService.instance;
    }

    this.apiService = new ApiService();

    MainPageService.instance = this;
  }

  /*
   * TODO: Получение категории
   */
  readPosts = async () => {
    const posts = await this.apiService.readPosts();
    const categories = await this.apiService.readCategories();

    return posts.map(({comments, categories: categoriesIds, ...restProperties}) => ({
      ...restProperties,
      commentsAmount: comments.length,
      categories: createAndFillArray(categoriesIds.length, () => getRandomArrayValue(categories)),
    }));
  }

  readMostDiscussedPosts = async () => {
    let posts = await this.apiService.readPosts();

    posts = posts.sort((a, b) => b.commentsAmount - a.commentsAmount)
      .slice(0, MOST_DISCUSSED_POSTS_AMOUNT);

    return posts.map(({id, title, comments}) => ({
      id,
      title,
      commentsAmount: comments.length,
    }));
  }

  readLastComments = async () => {
    let comments = await this.apiService.readComments();
    const users = await this.apiService.readUsers();

    const user = users[0];

    comments = comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, LAST_COMMENTS_AMOUNT);

    return comments.map(({text, post, id}) => ({
      id,
      text,
      postId: post,
      user: {
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
      },
    }));
  }

  /*
   * TODO: Получение авторизованного пользователя
   */
  readUser = async () => {
    const users = await this.apiService.readUsers();

    return users[0];
  }

  readCategories = async () => {
    const categories = await this.apiService.readCategories();

    return categories.map((category) => ({
      ...category,
      postsAmount: generateRandomNumber(0, 10),
    }))
      .filter((category) => category.postsAmount > 0);
  }

  readHelloText = async () => {
    return `Это приветственный текст,\nкоторый владелец блога может\nвыбрать, чтобы описать себя 👏`;
  }
}

module.exports = MainPageService;
