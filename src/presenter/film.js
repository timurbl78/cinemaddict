import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/film-popup';

import {UserAction} from '../const';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Film {
  constructor(filmContainer, filmPopupContainer, changeData, changeMode, api) {
    this._filmContainer = filmContainer;
    this._filmPopupContainer = filmPopupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._mode = Mode.DEFAULT;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);


    this._api.getComments(film.id)
      .then((comments) => {
        this._filmPopupComponent = new FilmPopupView(this._film, comments);
        this._filmPopupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
        this._filmPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
        this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
        this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
        this._filmPopupComponent.setAddCommentHandler(this._handleAddComment);
        this._filmPopupComponent.setDeleteCommentHandler(this._handleDeleteComment);

        if (this._mode === Mode.POPUP) {
          replace(this._filmPopupComponent, prevFilmPopupComponent);
        }
      });

    if (prevFilmCardComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
    remove(this._filmCardComponent);
    if (this._filmPopupComponent !== null) {
      remove(this._filmPopupComponent);
    }
  }

  _openPopup() {
    this._filmPopupContainer.appendChild(this._filmPopupComponent.getElement());
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    this._filmPopupContainer.removeChild(this._filmPopupComponent.getElement());
    this._mode = Mode.DEFAULT;
    this._changeData(
      UserAction.UPDATE_FILM,
      Object.assign(
        {},
        this._film,
      ), true,
    );
  }

  _onEscKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
      this._changeMode();
      document.removeEventListener('keydown', this._onEscKeyDownHandler);
    }
  }

  _handleOpenPopupClick() {
    this._openPopup();
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  }

  _handleClosePopupClick() {
    this._closePopup();
    this._changeMode();
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
      UserAction.UPDATE_FILM,
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
        watchingDate: this._film.film.isWatched ? null : new Date(),
        isWatched: !this._film.film.isWatched,
      },
    );

    this._changeData(
      UserAction.UPDATE_FILM,
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
      UserAction.UPDATE_FILM,
      Object.assign(
        {},
        this._film,
        {
          film: film,
        },
      ),
    );
  }

  _handleAddComment(data, newComment) {
    this._changeData(
      UserAction.ADD_COMMENT,
      Object.assign(
        {},
        this._film,
        data,
      ),
      false,
      null,
      newComment,
    );
  }

  _handleDeleteComment(data, commentId) {
    const comments = [...data.comments];
    this._changeData(
      UserAction.DELETE_COMMENT,
      Object.assign(
        {},
        this._film,
        {
          comments: comments,
        },
      ),
      false,
      commentId,
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }
}
