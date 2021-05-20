import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
    this._notify();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(listTitle, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(listTitle, update);
  }

  static adaptToClient(movie) {
    const adaptedFilm = Object.assign(
      {},
      movie,
      {
        film: {
          actors: movie.film_info.actors,
          age: movie.film_info.age_rating,
          country: movie.film_info.release.release_country,
          date: movie.film_info.release.date,
          description: movie.film_info.description,
          director: movie.film_info.director,
          genres: movie.film_info.genre,
          isFavorite: movie.user_details.favorite,
          isInWatchlist: movie.user_details.watchlist,
          isWatched: movie.user_details.already_watched,
          name: movie.film_info.title,
          nameOriginal: movie.film_info.alternative_title,
          poster: movie.film_info.poster,
          rating: movie.film_info.total_rating,
          duration: movie.film_info.runtime,
          writers: movie.film_info.writers,
          watchingDate: movie.user_details.watching_date,
        },
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(movie) {
    const adaptedFilm = Object.assign(
      {},
      movie,
      {
        film_info: {
          actors: movie.film.actors,
          age_rating: movie.film.age,
          description: movie.film.description,
          director: movie.film.director,
          genre: movie.film.genres,
          title: movie.film.name,
          alternative_title: movie.film.nameOriginal,
          poster: movie.film.poster,
          total_rating: movie.film.rating,
          runtime: movie.film.duration,
          writers: movie.film.writers,
          release: {
            release_country: movie.film.country,
            date: movie.film.date,
          },
        },
        user_details: {
          favorite: movie.film.isFavorite,
          watchlist: movie.film.isInWatchlist,
          already_watched: movie.film.isWatched,
          watching_date: movie.film.watchingDate,
        },
      },
    );

    delete adaptedFilm.film;

    return adaptedFilm;
  }
}
