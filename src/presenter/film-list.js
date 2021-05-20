import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import FilmPresenter from './film';
import { remove, render, RenderPosition } from '../utils/render';
import {sortCommentDown, sortRatingDown} from '../utils/film';
import {FilmListTitle} from '../const.js';

const FILM_COUNT_PER_STEP = 5;
const FILM_LIST_EXTRA_COUNT = 2;

export default class FilmList {
  constructor(api, filmsContainerComponent, filmsPopupContainer, listTitle, changeData, isExtra = false) {
    this._filmsContainerComponent = filmsContainerComponent;
    this._filmsPopupContainer = filmsPopupContainer;
    this._listTitle = listTitle;
    this._changeData = changeData;
    this._isExtra = isExtra;
    this._api = api;

    this._filmsCountToShow = (this._isExtra) ? FILM_LIST_EXTRA_COUNT : FILM_COUNT_PER_STEP;
    this._renderedFilmCount = this._filmsCountToShow;

    this._filmPresenter = {};

    this._filmsListComponent = new FilmsListView(this._listTitle, this._isExtra);
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._clearFilmList();
    this._films = films.slice();
    if (this._isExtra) {
      switch (this._listTitle) {
        case FilmListTitle.RATING:
          this._films.sort(sortRatingDown);
          break;
        case FilmListTitle.COMMENT:
          this._films.sort(sortCommentDown);
          break;
        default:
          break;
      }
    }
    this._renderFilmList();
  }

  destroy() {
    this._clearFilmList();
    remove(this._filmsListComponent);
    remove(this._showMoreButtonComponent);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    remove(this._showMoreButtonComponent);
  }

  _handleFilmChange(userAction, updatedFilm, isReloadNeeded = false, commentId = null, newComment = null) {
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
    this._changeData(userAction, this._listTitle, updatedFilm, commentId, newComment);

    if (this._listTitle === FilmListTitle.COMMENT && isReloadNeeded === true) {
      this.init(this._films);
    }
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListContainerComponent, this._filmsPopupContainer, this._handleFilmChange, this._handleModeChange, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {this._renderFilm(film);});
  }

  _renderShowMoreButtton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    if (!this._isExtra) {
      render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    } else {
      render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    }
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, Math.min(this._films.length, this._renderedFilmCount));

    if (!this._isExtra && this._films.length > this._renderedFilmCount) {
      this._renderShowMoreButtton();
    }
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
