'use strict';

const generateRandomNumber = (min, max) => {
  const roundedUpMin = Math.ceil(min);
  const roundedDownMax = Math.floor(max);

  return Math.floor(Math.random() * (roundedDownMax - roundedUpMin + 1)) + roundedUpMin;
};

const getRandomArrayValue = (array) => array[Math.floor(Math.random() * array.length)];

const shuffleArray = (array) => {
  const copiedArray = array.slice();

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomArrayIndex = Math.floor(Math.random() * i);

    [copiedArray[i], copiedArray[randomArrayIndex]] = [copiedArray[randomArrayIndex], copiedArray[i]];
  }

  return copiedArray;
};

const createAndFillArray = (length, fnOrValue) => {
  if (typeof fnOrValue === 'function') {
    return Array.from({length}).map(() => fnOrValue());
  }

  return Array.from({length}).fill(fnOrValue);
};

module.exports = {
  generateRandomNumber,
  getRandomArrayValue,
  shuffleArray,
  createAndFillArray,
};
