'use strict';

// Модуль с утилитарными функция-генераторами значений

/**
 * Генерирует случайное число из диапазона
 *
 * @param {number} min Нижняя граница диапазона
 * @param {number} max Верхняя граница диапазона
 * @return {number} Случайное число из диапазона от <min> до <max>
 */
const generateRandomNumber = (min, max) => {
  const roundedUpMin = Math.ceil(min);
  const roundedDownMax = Math.floor(max);

  return Math.floor(Math.random() * (roundedDownMax - roundedUpMin + 1)) + roundedUpMin;
};

module.exports = {generateRandomNumber};
