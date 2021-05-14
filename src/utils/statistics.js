import { KeyCodes } from "../const";

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

    film.genres.forEach((genre) => {
      genres.add(genre);
    });
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
