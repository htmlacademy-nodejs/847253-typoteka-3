const UsersService = require(`../users.service`);
const {UsersRepository} = require(`../users.repository`);

jest.mock(`../users.repository`);

describe(`UsersService`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new UsersService()).toBe(new UsersService());
  });

  describe(`readUsers`, () => {
    test(`Возвращает пустую коллекцию пользователей`, () => {
      const usersService = new UsersService();

      const EXPECTED_USERS = [];

      UsersRepository.prototype.readUsers.mockReturnValueOnce(EXPECTED_USERS);

      expect(usersService.readUsers()).toEqual(EXPECTED_USERS);
    });

    test(`Возвращает пользователей`, () => {
      const usersService = new UsersService();

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

      UsersRepository.prototype.readUsers.mockReturnValueOnce(EXPECTED_USERS);

      expect(usersService.readUsers()).toEqual(EXPECTED_USERS);
    });
  });

  test(`readUser возвращает пользователя`, () => {
    const usersService = new UsersService();

    const EXPECTED_USER_ID = `I6wBpH`;

    const EXPECTED_USER = [
      {
        id: EXPECTED_USER_ID,
        name: `Спонж Боб`,
        surname: `Харбор`,
        avatar: `https://thishorsedoesnotexist.com`,
        role: `Администратор`,
      },
    ];

    UsersRepository.prototype.readUser.mockReturnValueOnce(EXPECTED_USER);

    expect(usersService.readUser(EXPECTED_USER_ID)).toEqual(EXPECTED_USER);
  });
});
