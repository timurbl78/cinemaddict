import dayjs from 'dayjs';
import AbstractView from './abstract';
import {humanizeFilmDuration} from '../utils/film';

export default class FilmCard extends AbstractView {
  constructor(data) {
    super();
    this._data = data;

    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
  }

  getTemplate() {
    return this._createFilmCardTemplate();
  }

  _createFilmCardTemplate() {
    const film = this._data.film;
    const comments = this._data.comments;
    let description = film.description;
    description = description.length < 140 ? description : description.slice(0, 140) + '…';

    return `<article class="film-card">
      <h3 class="film-card__title">${film.name}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(film.date).format('YYYY')}</span>
        <span class="film-card__duration">${humanizeFilmDuration(film.duration)}</span>
        <span class="film-card__genre">${film.genres[0]}</span>
      </p>
      <img src="${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isInWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`;
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();

    this._callback.openPopupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setOpenPopupClickHandler(callback) {
    this._callback.openPopupClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }
}
