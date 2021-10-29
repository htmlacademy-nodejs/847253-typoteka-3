const {PostsRepository} = require(`../posts.repository`);
const PostsService = require(`../posts.service`);

jest.mock(`@root/src/utils/logged-error`);

jest.mock(`../posts.repository`);

describe(`PostsService`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new PostsService()).toBe(new PostsService());
  });

  test(`createPost вызывает создание записи в репозитории и возвращает результат`, () => {
    const postsService = new PostsService();

    const POST_DATA = {
      categories: ['mnc-aZ'],
      image: 'https://thiscatdoesnotexist.com',
      date: '2021-10-26T13:21:21.048Z',
      title: 'Как пройти любой тест?',
      previewText: 'Никак',
      text: 'Абсолютно никак',
    };

    PostsRepository.prototype.createPost.mockReturnValueOnce(true);

    expect(postsService.createPost(POST_DATA)).toBe(true);
    expect(PostsRepository.prototype.createPost).toHaveBeenCalledWith(POST_DATA);
  });

  describe(`readPosts`, () => {
    test(`Возвращает пустую коллекцию записей`, () => {
      const postsService = new PostsService();

      const EXPECTED_POSTS = [];

      PostsRepository.prototype.readPosts.mockReturnValueOnce(EXPECTED_POSTS);

      expect(postsService.readPosts()).toEqual(EXPECTED_POSTS);
    });

    test(`Возвращает записи`, () => {
      const postsService = new PostsService();

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

      PostsRepository.prototype.readPosts.mockReturnValueOnce(EXPECTED_POSTS);

      expect(postsService.readPosts()).toEqual(EXPECTED_POSTS);
    });
  });

  test(`readPost возвращает запись`, () => {
    const postsService = new PostsService();

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
        `ccEwNd`
      ],
      comments: [
        `0oMFN8`
      ],
    };

    PostsRepository.prototype.readPost.mockReturnValueOnce(EXPECTED_POST);

    expect(postsService.readPost(EXPECTED_POST_ID)).toEqual(EXPECTED_POST);
    expect(PostsRepository.prototype.readPost).toHaveBeenCalledWith(EXPECTED_POST_ID);
  });

  test(`updatePost вызывает обновление записи в репозитории и возвращает результат`, () => {
    const postsService = new PostsService();

    const POST_DATA = {
      categories: ['mnc-aZ'],
      image: 'https://thiscatdoesnotexist.com',
      date: '2021-10-26T13:21:21.048Z',
      title: 'Как пройти любой тест?',
      previewText: 'Никак',
      text: 'Абсолютно никак',
    };

    PostsRepository.prototype.createPost.mockReturnValueOnce(true);

    expect(postsService.createPost(POST_DATA)).toBe(true);
    expect(PostsRepository.prototype.createPost).toHaveBeenCalledWith(POST_DATA);
  });

  test(`deletePost вызывает удаление записи в репозитории и возвращает результат`, () => {
    const postsService = new PostsService();

    const POST_TO_DELETE_ID = `Ms48a1`;

    PostsRepository.prototype.deletePost.mockReturnValueOnce(true);

    expect(postsService.deletePost(POST_TO_DELETE_ID)).toBe(true);
    expect(PostsRepository.prototype.deletePost).toHaveBeenCalledWith(POST_TO_DELETE_ID);
  });
});
