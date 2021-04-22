import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const getRandomArrayItem = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
};

export const getRandomArrayItems = (items, min, max) => {
  const randomCount = getRandomInteger(min, max);
  const result = [];

  for (let i = 0; i < randomCount; i++) {
    const randomItem = getRandomArrayItem(items);

    if (result.indexOf(randomItem) === -1) {
      result.push(randomItem);
    }
  }

  return result;
};


export const humanizeFilmDuration = (number) => {
  let hours = Math.floor(number / 60);
  const minutes = number - hours * 60;
  hours = hours ? `${hours}h` : '';
  return `${hours} ${minutes}m`;
};

export const generateRandomDate = (yearMin, yearMax) => {
  const yearMinjs = dayjs().year(yearMin);
  const yearMaxjs = dayjs().year(yearMax);
  return new Date(yearMinjs.valueOf() + Math.random() * (yearMaxjs.valueOf() - yearMinjs.valueOf()));
};

export const getStatus = (amount) => {
  if (amount === 0) {
    return '';
  }
  if (amount < 11) {
    return 'Novice';
  }
  if (amount < 21) {
    return 'Fan';
  }
  return 'Movie Buff';
};

