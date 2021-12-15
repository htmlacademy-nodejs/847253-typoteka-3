const ApiService = require(`@app/api`);

class AdminCommentsPageService {
  static instance = null;

  constructor() {
    if (AdminCommentsPageService.instance !== null) {
      return AdminCommentsPageService.instance;
    }

    this.apiService = new ApiService();

    AdminCommentsPageService.instance = this;
  }

  /*
   * TODO: Получение записи и пользователя
   */
  readComments = async () => {
    const comments = await this.apiService.readComments();
    const users = await this.apiService.readUsers();
    const posts = await this.apiService.readPosts();

    const user = users[0];
    const post = posts[0];

    return comments.map(({date, id, text}) => ({
      id,
      text,
      date,
      post: {
        id: post.id,
        title: post.title,
      },
      user: {
        avatar: user.avatar,
        name: user.name,
        surname: user.surname,
      },
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

module.exports = AdminCommentsPageService;
