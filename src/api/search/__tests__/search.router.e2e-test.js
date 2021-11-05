const request = require(`supertest`);

const {HttpStatusCode} = require(`@root/src/constants`);

const Api = require(`@api/api`);
const {PostsRepository} = require(`@api/posts/posts.repository`);

describe(`SearchRouter`, () => {
  const api = new Api();

  describe(`GET /api/search`, () => {
    test(`Возвращает код 400 и ошибку, если поисковый запрос пуст`, async () => {
      const emptyQueryResponse = await request(api.express).get(`/api/search`);

      expect(emptyQueryResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
      expect(emptyQueryResponse.body).toEqual({
        code: `JsonSchemaValidatorValidationError`,
        message: expect.any(String),
      });

      const emptyQueryQResponse = await request(api.express).get(`/api/search?q=`);

      expect(emptyQueryQResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
      expect(emptyQueryQResponse.body).toEqual({
        code: `JsonSchemaValidatorValidationError`,
        message: expect.any(String),
      });
    });

    test(`Возвращает код 200 и пустую коллекцию записей`, async () => {
      const postsRepository = new PostsRepository();

      postsRepository.posts = [{
        id: `NXBSs1`,
        title: `Музыкальный год`,
        date: `2021-08-20T13:29:23.122Z`,
        previewText: `В этом году вышло много классных хитов. Почему?`,
        text: `С этим вопросом мы обратились к Владимиру: -"А, кто знает? Дома все сидят из-за самоизоляции, наверное". Эта фраза точечно объясняет, почему в этом году вышло много классных хитов.`,
        categories: [
          `Kjsn-1`,
        ],
        comments: [
          `Lmc81a`,
        ],
      }];

      const response = await request(api.express).get(`/api/search?q=${encodeURI(`месяц`)}`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual([]);
    });

    test(`Возвращает код 200 и записи`, async () => {
      const postsRepository = new PostsRepository();

      const EXPECTED_POSTS = [{
        id: `NXBSs1`,
        title: `Музыкальный год`,
        date: `2021-08-20T13:29:23.122Z`,
        previewText: `В этом году вышло много классных хитов. Почему?`,
        text: `С этим вопросом мы обратились к Владимиру: -"А, кто знает? Дома все сидят из-за самоизоляции, наверное". Эта фраза точечно объясняет, почему в этом году вышло много классных хитов.`,
        categories: [
          `Kjsn-1`,
        ],
        comments: [
          `Lmc81a`,
        ],
      }];

      postsRepository.posts = EXPECTED_POSTS;

      const response = await request(api.express).get(`/api/search?q=${encodeURI(`год`)}`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_POSTS);
    });
  })
});
