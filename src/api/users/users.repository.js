const fs = require(`fs`);
const path = require(`path`);

class UsersRepositoryReadFileError extends Error {}
class UsersRepositoryUserNotFoundError extends Error {}

const FIXTURES_PATH = path.resolve(__dirname, `./users.repository.fixtures.json`);

class UsersRepository {
  static instance = null;

  constructor() {
    if (UsersRepository.instance !== null) {
      return UsersRepository.instance;
    }

    this._users = null;

    UsersRepository.instance = this;
  }

  readUsers = () => {
    return this.users;
  }

  readUser = (userId) => {
    const user = this.users.find(
        ({id: currentUserId}) => currentUserId === userId
    );

    if (user === undefined) {
      throw new UsersRepositoryUserNotFoundError(`User with ID '${userId}' not found`);
    }

    return user;
  }

  get users() {
    if (this._users === null) {
      try {
        const buffer = fs.readFileSync(FIXTURES_PATH);

        this._users = JSON.parse(buffer.toString());
      } catch {
        throw new UsersRepositoryReadFileError(`Failed to read file with fixtures`);
      }
    }

    return this._users;
  }

  set users(users) {
    this._users = users;
  }
}

module.exports = {UsersRepository, UsersRepositoryUserNotFoundError};
