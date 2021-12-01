/*
 * Перемешивает массив, предварительно копируя его
 */
const shuffleArray = (array) => {
  const copiedArray = array.slice();

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomArrayIndex = Math.floor(Math.random() * i);

    [copiedArray[i], copiedArray[randomArrayIndex]] = [copiedArray[randomArrayIndex], copiedArray[i]];
  }

  return copiedArray;
};

/*
 * Создаёт массив указанной длины, заполняя его значением или результатом переданной функции
 */
const createAndFillArray = (length, fnOrValue) => {
  if (typeof fnOrValue === `function`) {
    return Array.from({length}).map(() => fnOrValue());
  }

  return Array.from({length}).fill(fnOrValue);
};

/*
 * Возвращает случайное значение из переданного массива
 */
const getRandomArrayValue = (array) => array[Math.floor(Math.random() * array.length)];

module.exports = {shuffleArray, createAndFillArray, getRandomArrayValue};
