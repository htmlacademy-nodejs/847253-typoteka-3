const ApiService = require(`@app/api`);

class AdminPostsPageService {
  static instance = null;

  constructor() {
    if (AdminPostsPageService.instance !== null) {
      return AdminPostsPageService.instance;
    }

    this.apiService = new ApiService();

    AdminPostsPageService.instance = this;
  }

  readPosts = async () => {
    const posts = await this.apiService.readPosts();

    return posts.map(({date, id, title}) => ({
      date,
      id,
      title,
    }));
  }

  /*
   * TODO: Получение авторизованного пользователя
   */
  readUser = async () => {
    const users = await this.apiService.readUsers();

    const user = users[0];

    user.role = `Administrator`;

    return user;
  }
}

module.exports = AdminPostsPageService;
