const {HttpStatusCode} = require(`@root/src/constants`);

const UsersRouter = require(`../users.router`);
const UsersService = require(`../users.service`);
const {UsersRepositoryUserNotFoundError} = require(`../users.repository`);

jest.mock(`pino`);

jest.mock(`../users.repository`);
jest.mock(`../users.service`);

describe(`UserRouter`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new UsersRouter()).toBe(new UsersRouter());
  });

  describe(`readUsers`, () => {
    test(`Передаёт пустую коллекцию пользователей в ответе на запрос`, () => {
      const usersRouter = new UsersRouter();

      const EXPECTED_USERS = [];

      const response = {send: jest.fn()};

      UsersService.prototype.readUsers.mockReturnValueOnce(EXPECTED_USERS);

      usersRouter.readUsers(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_USERS);
    });

    test(`Передаёт пользователей в ответе на запрос`, () => {
      const usersRouter = new UsersRouter();

      const EXPECTED_USERS = [
        {
          id: `I6wBpH`,
          name: `Спонж Боб`,
          surname: `Харбор`,
          avatar: `https://thishorsedoesnotexist.com`,
          role: `Администратор`,
        },
        {
          id: `5ODw_7`,
          name: `Анджелина`,
          surname: `Ланс`,
          avatar: `https://thispersondoesnotexist.com/image`,
          role: `Администратор`,
        },
      ];

      const response = {send: jest.fn()};

      UsersService.prototype.readUsers.mockReturnValueOnce(EXPECTED_USERS);

      usersRouter.readUsers(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_USERS);
    });
  });

  describe(`readUser`, () => {
    test(`Передаёт код 404 и ошибку в ответе на запрос, если получает исключение UsersRepositoryUserNotFound`, () => {
      const usersRouter = new UsersRouter();

      const USER_ID = `3EPlkL`;

      const request = {
        params: {
          userId: USER_ID,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      const usersRepositoryUserNotFoundError = (
        new UsersRepositoryUserNotFoundError(`User with ID '${USER_ID}' not found`)
      );

      UsersService.prototype.readUser.mockImplementationOnce(() => {
        throw usersRepositoryUserNotFoundError;
      });

      usersRouter.readUser(request, response);

      expect(UsersService.prototype.readUser).toHaveBeenCalledWith(USER_ID);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(response.send).toHaveBeenCalledWith({
        code: usersRepositoryUserNotFoundError.constructor.name,
        message: usersRepositoryUserNotFoundError.message
      });
    });

    test(`Передаёт пользователя в ответе на запрос`, () => {
      const usersRouter = new UsersRouter();

      const EXPECTED_USER_ID = `I6wBpH`;

      const EXPECTED_USER = [{
          id: EXPECTED_USER_ID,
          name: `Спонж Боб`,
          surname: `Харбор`,
          avatar: `https://thishorsedoesnotexist.com`,
          role: `Администратор`,
      }];

      const request = {
        params: {
          userId: EXPECTED_USER_ID,
        },
      };

      const response = {send: jest.fn()};

      UsersService.prototype.readUser.mockReturnValueOnce(EXPECTED_USER);

      usersRouter.readUser(request, response);

      expect(UsersService.prototype.readUser).toHaveBeenCalledWith(EXPECTED_USER_ID);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_USER);
    });
  });
});
