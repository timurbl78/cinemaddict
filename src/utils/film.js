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

export const sortDateDown = (filmA, filmB) => {
  return dayjs(filmB.film.date).diff(dayjs(filmA.film.date));
};

export const sortRatingDown = (filmA, filmB) => {
  return filmB.film.rating - filmA.film.rating;
};

export const sortCommentDown = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};

export const isWatchedToday = (film) => {
  const filmDate = dayjs(film.film.watchingDate);
  const now = dayjs();
  return filmDate.diff(now, 'day') === 0;
};

export const isWatchedWeek = (film) => {
  const filmDate = dayjs(film.film.watchingDate);
  const now = dayjs();
  return now.diff(filmDate, 'day') <= 7;
};

export const isWatchedMonth = (film) => {
  const filmDate = dayjs(film.film.watchingDate);
  const now = dayjs();
  return now.diff(filmDate, 'day') <= 28;
};

export const isWatchedYear = (film) => {
  const filmDate = dayjs(film.film.watchingDate);
  const now = dayjs();
  return now.diff(filmDate, 'day') <= 365;
};
