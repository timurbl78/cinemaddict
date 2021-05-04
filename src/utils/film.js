import dayjs from 'dayjs';

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

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortDateDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.film.date, filmB.film.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.film.date).diff(dayjs(filmA.film.date));
};

export const sortRatingDown = (filmA, filmB) => {
  return filmB.film.rating - filmA.film.rating;
};
