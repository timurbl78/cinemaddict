import { StatisticType } from '../const';
import { isWatchedToday, isWatchedWeek, isWatchedMonth, isWatchedYear } from './film';

export const getMyMoviesByGenre = (data) => {
  const genres = getGenres(data);

  const result = Array.from(genres).reduce( (a,c) => { a[c]=0; return a; }, {});

  data.forEach((element) => {
    const film = element.film;

    if (film.isWatched) {
      film.genres.forEach((genre) => {
        result[genre]++;
      });
    }
  });

  return result;
};

export const getGenres = (data) => {
  const genres = new Set();

  data.forEach((element) => {
    const film = element.film;

    if (film.isWatched) {
      film.genres.forEach((genre) => {
        genres.add(genre);
      });
    }
  });

  return genres;
};

export const getWatchedMovies = (data) => {
  return data.filter((el) => el.film.isWatched);
};

export const getTopGenre = (data) => {
  const myMovies = getMyMoviesByGenre(data);

  const maxNumber = Object.values(myMovies).sort().reverse()[0];
  let result = '';

  for (const [key, value] of Object.entries(myMovies)) {
    if (value === maxNumber) {
      result = key;
      break;
    }
  }

  return result;
};

export const getTotalDuration = (data) => {
  let duration = 0;
  data.forEach((film) => {
    duration += film.film.duration;
  });

  return duration;
};

export const filter = {
  [StatisticType.ALL]: (data) => data,
  [StatisticType.TODAY]: (data) => data.filter((el) => isWatchedToday(el)),
  [StatisticType.WEEK]: (data) => data.filter((el) => isWatchedWeek(el)),
  [StatisticType.MONTH]: (data) => data.filter((el) => isWatchedMonth(el)),
  [StatisticType.YEAR]: (data) => data.filter((el) => isWatchedYear(el)),
};
