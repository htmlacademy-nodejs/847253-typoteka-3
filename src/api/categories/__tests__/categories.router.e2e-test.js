const request = require(`supertest`);

const {HttpStatusCode} = require(`@root/src/constants`);

const Api = require(`@api/api`);

const CategoriesRepository = require(`../categories.repository`);

describe(`CategoriesRouter`, () => {
  const api = new Api();

  describe(`GET /api/categories`, () => {
    test(`Возвращает код 200 и пустую коллекцию категорий`, async () => {
      const categoriesRepository = new CategoriesRepository();

      const EXPECTED_CATEGORIES = [{id: `JQ-81s`, name: `Жизненные истории`}];

      categoriesRepository.categories = EXPECTED_CATEGORIES;

      const response = await request(api.express).get(`/api/categories`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_CATEGORIES);
    });

    test(`Возвращает код 200 и категории`, async () => {
      const categoriesRepository = new CategoriesRepository();

      const EXPECTED_CATEGORIES = [{id: `JQ-81s`, name: `Жизненные истории`}];

      categoriesRepository.categories = EXPECTED_CATEGORIES;

      const response = await request(api.express).get(`/api/categories`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_CATEGORIES);
    });
  })
});
