const CategoriesService = require(`../categories.service`);
const CategoriesRepository = require(`../categories.repository`);

jest.mock(`../categories.repository`);

describe(`CategoriesService`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CategoriesService()).toBe(new CategoriesService());
  });

  describe(`readCategories`, () => {
    test(`Возвращает пустую коллекцию категорий`, () => {
      const categoriesService = new CategoriesService();

      const EXPECTED_CATEGORIES = [];

      CategoriesRepository.prototype.readCategories.mockReturnValueOnce(EXPECTED_CATEGORIES);

      expect(categoriesService.readCategories()).toEqual(EXPECTED_CATEGORIES);
    });

    test(`Возвращает категории`, () => {
      const categoriesService = new CategoriesService();

      const EXPECTED_CATEGORIES = [
        {name: `🌲 Деревья`, id: `WCzHKQ`},
        {name: `👀 За жизнь`, id: `sbA7_8`},
        {name: `🖼 Без рамки`, id: `guQ4RE`},
      ];

      CategoriesRepository.prototype.readCategories.mockReturnValueOnce(EXPECTED_CATEGORIES);

      expect(categoriesService.readCategories()).toEqual(EXPECTED_CATEGORIES);
    });
  });
});
