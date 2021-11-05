const request = require(`supertest`);

const {HttpStatusCode} = require(`@root/src/constants`);

const Api = require(`@api/api`);

const {UsersRepository} = require(`../users.repository`);

describe(`UsersRouter`, () => {
  const api = new Api();

  describe(`GET /api/users`, () => {
    test(`Возвращает код 200 и пустую коллекцию пользователей`, async () => {
      const usersRepository = new UsersRepository();

      const EXPECTED_USERS = [];

      usersRepository.users = EXPECTED_USERS;

      const response = await request(api.express).get(`/api/users`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_USERS);
    });

    test(`Возвращает код 200 и пользователей`, async () => {
      const usersRepository = new UsersRepository();

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

      usersRepository.users = EXPECTED_USERS;

      const response = await request(api.express).get(`/api/users`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_USERS);
    });
  })

  describe(`GET /api/users/:id`, () => {
    test(`Возвращает код 404 и ошибку, если пользователь не найден`, async () => {
      const usersRepository = new UsersRepository();

      const USER_ID = `I6wBpH`;

      usersRepository.users = [{
        id: `5ODw_7`,
        name: `Анджелина`,
        surname: `Ланс`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Администратор`,
      }];

      const response = await request(api.express).get(`/api/users/${USER_ID}`);

      expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
      expect(response.body).toEqual({
        code: `UsersRepositoryUserNotFoundError`,
        message: `User with ID '${USER_ID}' not found`,
      });
    });

    test(`Возвращает код 200 и пользователя`, async () => {
      const usersRepository = new UsersRepository();

      const EXPECTED_USER_ID = `I6wBpH`;

      const EXPECTED_USER = {
        id: EXPECTED_USER_ID,
        name: `Спонж Боб`,
        surname: `Харбор`,
        avatar: `https://thishorsedoesnotexist.com`,
        role: `Администратор`,
      };

      usersRepository.users = [EXPECTED_USER];

      const response = await request(api.express).get(`/api/users/${EXPECTED_USER_ID}`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_USER);
    });
  });
});
