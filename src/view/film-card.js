import dayjs from 'dayjs';
import {humanizeFilmDuration, createElement} from '../utils';

export default class FilmCard {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return this._createFilmCardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
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
}
