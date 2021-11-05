const CategoriesRouter = require(`../categories.router`);
const CategoriesService = require(`../categories.service`);

jest.mock(`pino`);

jest.mock(`../categories.service`);

describe(`CategoriesRouter`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CategoriesRouter()).toBe(new CategoriesRouter());
  });

  describe(`readCategories`, () => {
    test(`Передаёт пустую коллекцию категорий в ответе на запрос`, () => {
      const categoriesRouter = new CategoriesRouter();

      const EXPECTED_CATEGORIES = [];

      const response = {status: jest.fn(), send: jest.fn()};

      CategoriesService.prototype.readCategories.mockReturnValueOnce(EXPECTED_CATEGORIES);

      categoriesRouter.readCategories(null, response);

      expect(response.status).not.toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith(EXPECTED_CATEGORIES);
    });

    test(`Передаёт категории в ответе на запрос`, () => {
      const categoriesRouter = new CategoriesRouter();

      const EXPECTED_CATEGORIES = [
        {name: `🌲 Деревья`, id: `WCzHKQ`},
        {name: `👀 За жизнь`, id: `sbA7_8`},
        {name: `🖼 Без рамки`, id: `guQ4RE`},
      ];

      const response = {send: jest.fn()};

      CategoriesService.prototype.readCategories.mockReturnValueOnce(EXPECTED_CATEGORIES);

      categoriesRouter.readCategories(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_CATEGORIES);
    });
  });
});
