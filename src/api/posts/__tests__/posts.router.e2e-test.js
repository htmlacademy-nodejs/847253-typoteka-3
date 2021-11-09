const request = require(`supertest`);

const {HttpStatusCode} = require(`@root/src/constants`);

const Api = require(`@api/api`);

const {PostsRepository} = require(`../posts.repository`);

describe(`PostsRouter`, () => {
  const api = new Api();

  describe(`POST /api/posts`, () => {
    test(`Возвращает код 400 и ошибку, если получены некорректные данные записи`, async () => {
      const response = await request(api.express).post(`/api/posts`).send({date: 2});

      expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
      expect(response.body).toEqual({
        code: `JsonSchemaValidatorValidationError`,
        message: expect.any(String),
      });
    });

    test(`Возвращает код 201, true и создаёт запись`, async () => {
      const postsRepository = new PostsRepository();

      postsRepository.posts = [];

      const POST_DATA = {
        categories: ['mnc-aZ'],
        image: 'https://thiscatdoesnotexist.com',
        date: '2021-10-26T13:21:21.048Z',
        title: 'Как пройти любой тест и не пожалеть, что родился? Советы от начинающего ЕГЭшника',
        previewText: 'Для начала нужно хорошенько к нему подготовиться. Вы ведь не хотите рассчитывать на удачу?',
        text: 'Брось это дело!',
      };

      const response = await request(api.express).post(`/api/posts`).send(POST_DATA);

      expect(response.statusCode).toBe(HttpStatusCode.CREATED);
      expect(response.body).toEqual(true);
    });
  });

  describe(`GET /api/posts`, () => {
    test(`Возвращает код 200 и пустую коллекцию записей`, async () => {
      const postsRepository = new PostsRepository();

      const EXPECTED_POSTS = [];

      postsRepository.posts = EXPECTED_POSTS;

      const response = await request(api.express).get(`/api/posts`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_POSTS);
    });

    test(`Возвращает код 200 и записи`, async () => {
      const postsRepository = new PostsRepository();

      const EXPECTED_POSTS = [{
        id: `SSEF88`,
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`
        ],
        comments: [
          `0oMFN8`
        ],
      }];

      postsRepository.posts = EXPECTED_POSTS;

      const response = await request(api.express).get(`/api/posts`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_POSTS);
    });
  });

  describe(`GET /api/posts/:id`, () => {
    test(`Возвращает код 404 и ошибку, если запись не найдена`, async () => {
      const postsRepository = new PostsRepository();

      const POST_ID = `SSEF87`;

      postsRepository.posts = [{
        id: `SSEF88`,
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`,
        ],
        comments: [
          `0oMFN8`,
        ],
      }];

      const response = await request(api.express).get(`/api/posts/${POST_ID}`);

      expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
      expect(response.body).toEqual({
        code: `PostsRepositoryPostNotFoundError`,
        message: `Post with ID '${POST_ID}' not found`,
      });
    });

    test(`Возвращает код 200 и запись`, async () => {
      const postsRepository = new PostsRepository();

      const EXPECTED_POST_ID = `SSEF88`;

      const EXPECTED_POST = {
        id: EXPECTED_POST_ID,
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`,
        ],
        comments: [
          `0oMFN8`,
        ],
      };

      postsRepository.posts = [EXPECTED_POST];

      const response = await request(api.express).get(`/api/posts/${EXPECTED_POST_ID}`);

      expect(response.status).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_POST);
    });
  });

  describe(`PUT /api/posts/:id`, () => {
    test(`Возвращает код 400 и ошибку, если получены некорректные данные записи`, async () => {
      const response = await request(api.express).put(`/api/posts/Mnc-98a`).send({title: 'Кратко'});

      expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
      expect(response.body).toEqual({
        code: `JsonSchemaValidatorValidationError`,
        message: expect.any(String),
      });
    });

    test(`Возвращает код 200, true и обновляет запись`, async () => {
      const postsRepository = new PostsRepository();

      const POST_TO_UPDATE_ID = `SSEF88`;

      postsRepository.posts = [{
        id: POST_TO_UPDATE_ID,
        image: 'https://thiscatdoesnotexist.com',
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`
        ],
        comments: [
          `0oMFN8`
        ],
      }];

      const POST_DATA = {
        categories: ['mnc-aZ'],
        image: 'https://thiscatdoesnotexist.com',
        date: '2021-10-26T13:21:21.048Z',
      };

      const response = await request(api.express).put(`/api/posts/${POST_TO_UPDATE_ID}`).send(POST_DATA);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(true);
    });
  });

  describe(`DELETE /api/posts/:id`, () => {
    test(`Возвращает код 404 и ошибку, если запись не найдена`, async () => {
      const postsRepository = new PostsRepository();

      const POST_ID = `SSEF87`;

      postsRepository.posts = [{
        id: `SSEF88`,
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`,
        ],
        comments: [
          `0oMFN8`,
        ],
      }];

      const response = await request(api.express).delete(`/api/posts/${POST_ID}`);

      expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
      expect(response.body).toEqual({
        code: `PostsRepositoryPostNotFoundError`,
        message: `Post with ID '${POST_ID}' not found`,
      });
    });

    test(`Возвращает код 200, true и удаляет запись`, async () => {
      const postsRepository = new PostsRepository();

      const POST_TO_DELETE_ID = `SSEF88`;

      postsRepository.posts = [{
        id: POST_TO_DELETE_ID,
        image: 'https://thiscatdoesnotexist.com',
        title: `Лучшие рок-музыканты 20-века`,
        date: `2021-09-10T09:26:08.984Z`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`
        ],
        comments: [
          `0oMFN8`
        ],
      }];

      const response = await request(api.express).delete(`/api/posts/${POST_TO_DELETE_ID}`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(true);
    });
  });
});
