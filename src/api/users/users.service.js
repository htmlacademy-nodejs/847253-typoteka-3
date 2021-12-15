const {UsersRepository} = require(`./users.repository`);

class UsersService {
  static instance = null;

  constructor() {
    if (UsersService.instance !== null) {
      return UsersService.instance;
    }

    this.usersRepository = new UsersRepository();

    UsersService.instance = this;

    return UsersService.instance;
  }

  readUsers = () => {
    return this.usersRepository.readUsers();
  }

  readUser = (userId) => {
    return this.usersRepository.readUser(userId);
  }
}

module.exports = UsersService;
