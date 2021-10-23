const {UsersRepository} = require(`./users.repository`);

class UsersService {
  /**
   * @type {UsersService | null}
   */
  static instance = null;

  /**
   * @return {UsersService | void}
   */
  constructor() {
    if (UsersService.instance !== null) {
      return UsersService.instance;
    }

    /**
     * @private
     * @readonly
     * @type {UsersRepository}
     */
    this.usersRepository = new UsersRepository();

    UsersRepository.instance = this;
  }

  /**
   * @public
   * @return {User[]}
   */
  readUsers = () => {
    return this.usersRepository.readUsers();
  }

  /**
   * @public
   * @param {string} userId
   * @return {User}
   */
  readUser = (userId) => {
    return this.usersRepository.readUser(userId);
  }
}

module.exports = UsersService;
