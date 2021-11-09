const CategoriesRepository = require(`../categories.repository`);

describe(`CategoriesRepository`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CategoriesRepository()).toBe(new CategoriesRepository());
  });

  describe(`readCategories`, () => {
    test(`Возвращает пустую коллекцию категорий`, () => {
      const categoriesRepository = new CategoriesRepository();

      const EXPECTED_CATEGORIES = [];

      categoriesRepository.categories = EXPECTED_CATEGORIES;

      expect(categoriesRepository.readCategories()).toEqual(EXPECTED_CATEGORIES);
    });

    test(`Возвращает категории`, () => {
      const categoriesRepository = new CategoriesRepository();

      const EXPECTED_CATEGORIES = [
        {name: `🌲 Деревья`, id: `WCzHKQ`},
        {name: `👀 За жизнь`, id: `sbA7_8`},
        {name: `🖼 Без рамки`, id: `guQ4RE`},
      ];

      categoriesRepository.categories = EXPECTED_CATEGORIES;

      expect(categoriesRepository.readCategories()).toEqual(EXPECTED_CATEGORIES);
    });
  });
});
