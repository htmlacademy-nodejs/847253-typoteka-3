/**
 * Перемешивает массив, предварительно копируя его
 *
 * @template T
 * @param {T[]} array Массив, подлежащий перемешиванию
 * @return {T[]} Копия массива *array* с новым случайным порядком элементов
 */
const shuffleArray = (array) => {
  const copiedArray = array.slice();

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomArrayIndex = Math.floor(Math.random() * i);

    [copiedArray[i], copiedArray[randomArrayIndex]] = [copiedArray[randomArrayIndex], copiedArray[i]];
  }

  return copiedArray;
};

/**
 * Создаёт массив указанной длины, заполняя его значением или результатом переданной функции
 *
 * @template T
 * @param {number} length Длина массива
 * @param {T | function(): T} fnOrValue Значение или функция, возвращающая значения для заполнения
 * @return {T[]} Массив с длиной *length*, заполненный значением или результатом функции из параметра *fnOrValue*
 */
const createAndFillArray = (length, fnOrValue) => {
  if (typeof fnOrValue === `function`) {
    return Array.from({length}).map(() => fnOrValue());
  }

  return Array.from({length}).fill(fnOrValue);
};

/**
 * Возвращает случайное значение из переданного массива
 *
 * @template T
 * @param {T[]} array Массив, из которого необходимо получить случайное значение
 * @return {T} Случайное значение из массива *array*
 */
const getRandomArrayValue = (array) => array[Math.floor(Math.random() * array.length)];

module.exports = {shuffleArray, createAndFillArray, getRandomArrayValue};
