const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);

const SearchRouter = require(`../search.router`);
const SearchService = require(`../search.service`);

jest.mock(`@root/src/utils/json-schema-validator`);
jest.mock(`@root/src/utils/logged-error`);

jest.mock(`../search.service`);

describe(`SearchRouter`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new SearchRouter()).toBe(new SearchRouter());
  });

  describe(`search`, () => {
    test(`Передаёт код 400 и ошибку в ответе на запрос, если получает исключение JsonSchemaValidatorValidationError`, () => {
      const searchRouter = new SearchRouter();

      const request = {
        query: {
          q: `Великолепная жизнь`,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      // TODO: По какой-то причине выводит в консоль ошибку, хотя мокнут
      const jsonSchemaValidatorValidationError = new JsonSchemaValidatorValidationError(`Some reason`);

      JsonSchemaValidator.prototype.validate.mockImplementationOnce(() => {
        throw jsonSchemaValidatorValidationError;
      });

      searchRouter.search(request, response);

      expect(JsonSchemaValidator.prototype.validate).toHaveBeenCalledWith(expect.any(Object), request);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        code: jsonSchemaValidatorValidationError.constructor.name,
        message: jsonSchemaValidatorValidationError.message
      });
    });

    test(`Передаёт пустую коллекцию записей в ответе на запрос`, () => {
      const searchRouter = new SearchRouter();

      const EXPECTED_POSTS = [];

      const request = {query: {q: `Агрокультура`}};

      const response = {send: jest.fn()};

      SearchService.prototype.search.mockReturnValueOnce(EXPECTED_POSTS);

      searchRouter.search(request, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_POSTS);
    });

    test(`Передаёт записи в ответе на запрос`, () => {
      const searchRouter = new SearchRouter();

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

      const request = {query: {q: `Музыкальный`}};

      const response = {send: jest.fn()};

      SearchService.prototype.search.mockReturnValueOnce(EXPECTED_POSTS);

      searchRouter.search(request, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_POSTS);
    });
  })
});
