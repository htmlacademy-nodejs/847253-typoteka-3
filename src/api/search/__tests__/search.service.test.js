const {PostsRepository} = require(`@api/posts/posts.repository`);

const SearchService = require(`../search.service`);

jest.mock(`@api/posts/posts.repository`);

describe(`SearchService`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new SearchService()).toBe(new SearchService());
  });

  describe(`search`, () => {
    test(`Возвращает пустую коллекцию записей`, () => {
      const searchService = new SearchService();

      const EXPECTED_POSTS = [];

      PostsRepository.prototype.searchPostsByTitle.mockReturnValueOnce(EXPECTED_POSTS);

      expect(searchService.search(`месяц`)).toEqual(EXPECTED_POSTS);
    });

    test(`Возвращает записи`, () => {
      const searchService = new SearchService();

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

      PostsRepository.prototype.searchPostsByTitle.mockReturnValueOnce(EXPECTED_POSTS);

      expect(searchService.search(`год`)).toEqual(EXPECTED_POSTS);
    });
  });
});
