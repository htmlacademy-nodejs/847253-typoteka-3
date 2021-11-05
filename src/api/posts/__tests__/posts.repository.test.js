const {PostsRepository, PostsRepositoryPostNotFoundError} = require(`../posts.repository`);

describe(`PostsRepository`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new PostsRepository()).toBe(new PostsRepository());
  });

  test(`createPost создаёт запись`, () => {
    const postsRepository = new PostsRepository();

    postsRepository.posts = [];

    postsRepository.createPost({
      categories: ['mnc-aZ'],
      image: 'https://thiscatdoesnotexist.com',
      date: '2021-10-26T13:21:21.048Z',
      title: 'Как пройти любой тест?',
      previewText: 'Никак',
      text: 'Абсолютно никак',
      comments: [],
    });

    expect(postsRepository.posts.length).toBe(1);
  });

  describe(`readPosts`, () => {
    test(`Возвращает пустую коллекцию записей`, () => {
      const postsRepository = new PostsRepository();

      const EXPECTED_POSTS = [];

      postsRepository.posts = EXPECTED_POSTS;

      expect(postsRepository.readPosts()).toEqual(EXPECTED_POSTS);
    });

    test(`Возвращает записи`, () => {
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

      expect(postsRepository.readPosts()).toEqual(EXPECTED_POSTS);
    });
  })

  describe(`readPost`, () => {
    test(`Выбрасывает PostsRepositoryPostNotFoundError, если запись не найдена`, () => {
      const postsRepository = new PostsRepository();

      postsRepository.posts = [{
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

      expect(() => {
        postsRepository.readPost(`Jha-12`);
      }).toThrow(PostsRepositoryPostNotFoundError);
    });

    test(`Возвращает запись`, () => {
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
          `ccEwNd`
        ],
        comments: [
          `0oMFN8`
        ],
      };

      postsRepository.posts = [EXPECTED_POST];

      expect(postsRepository.readPost(EXPECTED_POST_ID)).toEqual(EXPECTED_POST);
    });
  })

  describe(`updatePost`, () => {
    test(`Обновляет запись`, () => {
      const postsRepository = new PostsRepository();

      const POST_TO_UPDATE_ID = `HSax91`;

      const EXPECTED_POST_TITLE = `Новый заголовок записи`;

      const EXPECTED_POST = {
        id: POST_TO_UPDATE_ID,
        title: EXPECTED_POST_TITLE,
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

      postsRepository.posts = [{
        id: POST_TO_UPDATE_ID,
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

      expect(postsRepository.updatePost(POST_TO_UPDATE_ID, {title: EXPECTED_POST_TITLE})).toBe(true);
      expect(postsRepository.readPost(POST_TO_UPDATE_ID)).toEqual(EXPECTED_POST);
    });

    test(`Выбрасывает PostsRepositoryPostNotFoundError, если запись не найдена`, () => {
      const postsRepository = new PostsRepository();

      postsRepository.posts = [];

      expect(() => {
        postsRepository.updatePost(`Jha-12`, {});
      }).toThrow(PostsRepositoryPostNotFoundError);
    });
  });

  describe(`deletePost`, () => {
    test(`Удаляет запись`, () => {
      const postsRepository = new PostsRepository();

      const POST_TO_DELETE_ID = `HSax91`;

      postsRepository.posts = [{
        id: POST_TO_DELETE_ID,
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

      expect(postsRepository.deletePost(POST_TO_DELETE_ID)).toBe(true);
      expect(postsRepository.readPosts()).toEqual([]);
    });

    test(`Выбрасывает PostsRepositoryPostNotFoundError, если запись не найдена`, () => {
      const postsRepository = new PostsRepository();

      postsRepository.posts = [];

      expect(() => {
        postsRepository.deletePost(`HSax91`);
      }).toThrow(PostsRepositoryPostNotFoundError);
    });
  })

  test(`searchPostsByTitle возвращает искомые по заголовкам записи`, () => {
    const postsRepository = new PostsRepository();

    const FIRST_POST = {
      id: `xYpzSr`,
      title: `Учим HTML и CSS`,
      date: `2021-08-28T12:44:53.065Z`,
      previewText: `Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бросаем баклажаны в бульон и варим их до покраснения.`,
      text: `Добавляем вяленые помидоры и арахисовую пасту. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Он написал больше 30 хитов. Заворачиваем в лаваш и вкусный пирожочек ваш! Ёлки — это не просто красивое дерево. Это прочная древесина.`,
      categories: [
        `2GfbjW`,
        `jDXjg7`,
        `UEqYFS`,
      ],
      comments: [
        `hMeROI`,
        `4JHzw1`,
        `sgbcqs`,
        `Wd84pU`,
        `VLUFN6`,
      ],
    };

    const SECOND_POST = {
        id: `GHHSn2`,
        title: `Самый лучший музыкальный альбом этого года`,
        date: `2021-08-20T13:29:23.122Z`,
        previewText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
        text: `Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Самое верное решение - заказать еду из KFC.`,
        categories: [
          `oZQN8c`,
        ],
        comments: [
          `rFcCcO`,
          `DqrlmG`,
          `wSGlz9`,
        ],
      };

    const THIRD_POST = {
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
    };

    postsRepository.posts = [
      FIRST_POST,
      SECOND_POST,
      THIRD_POST,
    ];

    expect(postsRepository.searchPostsByTitle(`HTML`)).toEqual([FIRST_POST]);
    expect(postsRepository.searchPostsByTitle(`Музыкальный`)).toEqual([SECOND_POST, THIRD_POST]);
    expect(postsRepository.searchPostsByTitle(`Сколько лет Чебурашке?`)).toEqual([]);
  });
});
