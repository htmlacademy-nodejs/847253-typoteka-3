const {UsersRepository, UsersRepositoryUserNotFoundError} = require(`../users.repository`);

describe(`UsersRepository`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new UsersRepository()).toBe(new UsersRepository());
  });

  describe(`readUsers`, () => {
    test(`Возвращает пустую коллекцию пользователей`, () => {
      const usersRepository = new UsersRepository();

      const EXPECTED_USERS = [];

      usersRepository.users = EXPECTED_USERS;

      expect(usersRepository.readUsers()).toEqual(EXPECTED_USERS);
    });

    test(`Возвращает пользователей`, () => {
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

      expect(usersRepository.readUsers()).toEqual(EXPECTED_USERS);
    });
  });

  describe(`readUser`, () => {
    test(`Выбрасывает UsersRepositoryUserNotFoundError, если пользователь не найден`, () => {
      const usersRepository = new UsersRepository();

      usersRepository.users = [
        {
          id: `I6wBpH`,
          name: `Спонж Боб`,
          surname: `Харбор`,
          avatar: `https://thishorsedoesnotexist.com`,
          role: `Администратор`,
        },
      ];

      expect(() => {
        usersRepository.readUser(`N0-8dy`);
      }).toThrow(UsersRepositoryUserNotFoundError);
    });

    test(`Возвращает пользователя`, () => {
      const usersRepository = new UsersRepository();

      const EXPECTED_USER_ID = `5ODw_7`;

      const EXPECTED_USER = {
        id: EXPECTED_USER_ID,
        name: `Анджелина`,
        surname: `Ланс`,
        avatar: `https://thispersondoesnotexist.com/image`,
        role: `Администратор`,
      };

      usersRepository.users = [EXPECTED_USER];

      expect(usersRepository.readUser(EXPECTED_USER_ID)).toEqual(EXPECTED_USER);
    });
  });
});
