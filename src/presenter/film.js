import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/film-popup';

import {render, RenderPosition, replace, remove} from '../utils/render';

export default class Film {
  constructor(filmContainer, filmPopupContainer, changeData) {
    this._filmContainer = filmContainer;
    this._filmPopupContainer = filmPopupContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    //console.log(this._film.film.isFavorite);

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    //console.log(this._filmCardComponent.getElement());
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmPopupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);

    if (prevFilmCardComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmPopupContainer.contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
  }

  _openPopup() {
    this._filmPopupContainer.appendChild(this._filmPopupComponent.getElement());
  }

  _closePopup() {
    this._filmPopupContainer.removeChild(this._filmPopupComponent.getElement());
  }

  _onEscKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener('keydown', this._onEscKeyDownHandler);
    }
  }

  _handleOpenPopupClick() {
    this._openPopup();
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  }

  _handleClosePopupClick() {
    this._closePopup();
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  }

  _handleFavoriteClick() {
    const film = Object.assign(
      {},
      this._film.film,
      {
        isFavorite: !this._film.film.isFavorite,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          film: film,
        },
      ),
    );
  }

  _handleWatchedClick() {
    const film = Object.assign(
      {},
      this._film.film,
      {
        isWatched: !this._film.film.isWatched,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          film: film,
        },
      ),
    );
  }

  _handleWatchListClick() {
    const film = Object.assign(
      {},
      this._film.film,
      {
        isInWatchlist: !this._film.film.isInWatchlist,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          film: film,
        },
      ),
    );
  }
}