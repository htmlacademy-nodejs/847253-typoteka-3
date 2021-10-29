const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);

const PostsRouter = require(`../posts.router`);
const PostsService = require(`../posts.service`);
const {PostsRepositoryPostNotFoundError} = require(`../posts.repository`);

jest.mock(`@root/src/utils/json-schema-validator`);

jest.mock(`../posts.repository`);
jest.mock(`../posts.service`);

describe(`PostsRouter`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new PostsRouter()).toBe(new PostsRouter());
  });

  describe(`createPost`, () => {
    test(`Передаёт код 400 и ошибку в ответе на запрос, если получает исключение JsonSchemaValidatorValidationError`, () => {
      const postsRouter = new PostsRouter();

      const request = {
        body: {},
      };

      const response = {
        send: jest.fn(),
      };

      response.status = jest.fn(() => response);

      const jsonSchemaValidatorValidationError = new JsonSchemaValidatorValidationError(`Some reason`);

      JsonSchemaValidator.prototype.validate.mockImplementationOnce(() => {
        throw jsonSchemaValidatorValidationError;
      });

      postsRouter.createPost(request, response);

      expect(JsonSchemaValidator.prototype.validate).toHaveBeenCalledWith(expect.any(Object), request);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        code: jsonSchemaValidatorValidationError.constructor.name,
        message: jsonSchemaValidatorValidationError.message
      });
    })

    test(`Вызывает создание записи в сервисе и передаёт результат в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

      const POST_DATA = {
        categories: ['mnc-aZ'],
        image: 'https://thiscatdoesnotexist.com',
        date: '2021-10-26T13:21:21.048Z',
        title: 'Как пройти любой тест и не пожалеть, что родился? Советы от начинающего ЕГЭшника',
        previewText: 'Для начала нужно хорошенько к нему подготовиться. Вы ведь не хотите рассчитывать на удачу?',
        text: 'Брось это дело!',
      };

      const EXPECTED_RESULT = true;

      const request = {
        body: POST_DATA,
      };

      const response = {
        send: jest.fn(),
      };

      response.status = jest.fn(() => response);

      PostsService.prototype.createPost.mockReturnValueOnce(EXPECTED_RESULT);

      postsRouter.createPost(request, response);

      expect(PostsService.prototype.createPost).toHaveBeenCalledWith(POST_DATA);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_RESULT);
    });
  })

  describe(`readPosts`, () => {
    test(`Передаёт пустую коллекцию записей в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

      const EXPECTED_POSTS = [];

      const response = {send: jest.fn()};

      PostsService.prototype.readPosts.mockReturnValueOnce(EXPECTED_POSTS);

      postsRouter.readPosts(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_POSTS);
    });

    test(`Передаёт записи в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

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

      const response = {send: jest.fn()};

      PostsService.prototype.readPosts.mockReturnValueOnce(EXPECTED_POSTS);

      postsRouter.readPosts(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_POSTS);
    });
  });

  describe(`readPost`, () => {
    test(`Передаёт код 404 и ошибку в ответе на запрос, если получает исключение PostsRepositoryPostNotFound`, () => {
      const postsRouter = new PostsRouter();

      const POST_ID = `Bs-1ds`;

      const request = {
        params: {
          postId: POST_ID,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      const postsRepositoryPostNotFoundError = new PostsRepositoryPostNotFoundError(`Post with ID '${POST_ID}' not found`);

      PostsService.prototype.readPost.mockImplementationOnce(() => {
        throw postsRepositoryPostNotFoundError;
      });

      postsRouter.readPost(request, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(response.send).toHaveBeenCalledWith({
        code: postsRepositoryPostNotFoundError.constructor.name,
        message: postsRepositoryPostNotFoundError.message,
      });
    });

    test(`Передаёт запись в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

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

      PostsService.prototype.readPost.mockReturnValueOnce(EXPECTED_POST);

      const request = {
        params: {
          postId: EXPECTED_POST_ID,
        },
      };

      const response = {send: jest.fn()};

      postsRouter.readPost(request, response);

      expect(PostsService.prototype.readPost).toHaveBeenCalledWith(EXPECTED_POST_ID);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_POST);
    });
  })

  describe(`updatePost`, () => {
    test(`Передаёт код 400 и ошибку в ответе на запрос, если получает исключение JsonSchemaValidatorValidationError`, () => {
      const postsRouter = new PostsRouter();

      const request = {
        body: {},
      };

      const response = {
        send: jest.fn(),
      };

      response.status = jest.fn(() => response);

      const jsonSchemaValidatorValidationError = new JsonSchemaValidatorValidationError(`Some reason`);

      JsonSchemaValidator.prototype.validate.mockImplementationOnce(() => {
        throw jsonSchemaValidatorValidationError;
      });

      postsRouter.updatePost(request, response);

      expect(JsonSchemaValidator.prototype.validate).toHaveBeenCalledWith(expect.any(Object), request);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        code: jsonSchemaValidatorValidationError.constructor.name,
        message: jsonSchemaValidatorValidationError.message,
      });
    });

    test(`Передаёт код 404 и ошибку в ответе на запрос, если получает исключение PostsRepositoryPostNotFound`, () => {
      const postsRouter = new PostsRouter();

      const POST_TO_UPDATE_ID = `Bs-1ds`;

      const request = {
        body: {},
        params: {
          postId: POST_TO_UPDATE_ID,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      const postsRepositoryPostNotFoundError = new PostsRepositoryPostNotFoundError(`Post with ID '${POST_TO_UPDATE_ID}' not found`);

      PostsService.prototype.updatePost.mockImplementationOnce(() => {
        throw postsRepositoryPostNotFoundError;
      });

      postsRouter.updatePost(request, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(response.send).toHaveBeenCalledWith({
        code: postsRepositoryPostNotFoundError.constructor.name,
        message: postsRepositoryPostNotFoundError.message,
      });
    });

    test(`Вызывает обновление записи в сервисе и передаёт результат в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

      const EXPECTED_RESULT = true;

      const POST_TO_UPDATE_ID = `SSEF88`;

      const POST_DATA = {
        categories: [
          `RG0E8o`,
          `_dfyvk`,
          `ccEwNd`,
        ],
        image: 'https://thiscatdoesnotexist.com',
        date: `2021-09-10T09:26:08.984Z`,
        title: `Лучшие рок-музыканты 20-века`,
        previewText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бросаем баклажаны в бульон и варим их до покраснения.`,
        text: `Как начать действовать? Для начала просто соберитесь.`,
      };

      const request = {
        body: POST_DATA,
        params: {
          postId: POST_TO_UPDATE_ID,
        },
      };

      const response = {send: jest.fn()};

      PostsService.prototype.updatePost.mockReturnValueOnce(EXPECTED_RESULT);

      postsRouter.updatePost(request, response);

      expect(PostsService.prototype.updatePost).toHaveBeenCalledWith(expect.any(String), POST_DATA);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_RESULT);
    });
  });

  describe(`deletePost`, () => {
    test(`Передаёт код 404 и ошибку в ответе на запрос, если получает исключение PostsRepositoryPostNotFound`, () => {
      const postsRouter = new PostsRouter();

      const POST_TO_DELETE_ID = `Bs-1ds`;

      const request = {
        body: {},
        params: {
          postId: POST_TO_DELETE_ID,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      const postsRepositoryPostNotFoundError = new PostsRepositoryPostNotFoundError(`Post with ID '${POST_TO_DELETE_ID}' not found`);

      PostsService.prototype.deletePost.mockImplementationOnce(() => {
        throw postsRepositoryPostNotFoundError;
      });

      postsRouter.deletePost(request, response);

      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(response.send).toHaveBeenCalledWith({
        code: postsRepositoryPostNotFoundError.constructor.name,
        message: postsRepositoryPostNotFoundError.message,
      });
    });

    test(`Вызывает удаление записи в сервисе и передаёт результат в ответе на запрос`, () => {
      const postsRouter = new PostsRouter();

      const EXPECTED_RESULT = true;

      const POST_TO_DELETE_ID = `SSEF88`;

      const request = {
        params: {
          postId: POST_TO_DELETE_ID,
        },
      };

      const response = {send: jest.fn()};

      PostsService.prototype.deletePost.mockReturnValueOnce(EXPECTED_RESULT);

      postsRouter.deletePost(request, response);

      expect(PostsService.prototype.deletePost).toHaveBeenCalledWith(POST_TO_DELETE_ID);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_RESULT);
    });
  });
});
