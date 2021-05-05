import FilmsListView from '../view/films-list';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreButtonView from '../view/show-more-button';
import FilmPresenter from './film';
import { remove, render, RenderPosition } from '../utils/render';
import {updateItem} from '../utils/common';

const FILM_COUNT_PER_STEP = 5;
const FILM_LIST_EXTRA_COUNT = 2;

export default class FilmList {
  constructor(filmsContainerComponent, filmsPopupContainer, listTitle, isExtra = false) {
    this._filmsContainerComponent = filmsContainerComponent;
    this._filmsPopupContainer = filmsPopupContainer;
    this._listTitle = listTitle;
    this._isExtra = isExtra;

    this._filmsCountToShow = (this._isExtra) ? FILM_LIST_EXTRA_COUNT : FILM_COUNT_PER_STEP;
    this._renderedFilmCount = this._filmsCountToShow;

    this._filmPresenter = {};

    this._filmsListComponent = new FilmsListView(this._listTitle, this._isExtra);
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._clearFilmList();
    this._films = films.slice();
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

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    //this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.film.id].init(updatedFilm);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListContainerComponent, this._filmsPopupContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderShowMoreButtton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, Math.min(this._films.length, this._filmsCountToShow));

    if (!this._isExtra && this._films.length > FILM_COUNT_PER_STEP) {
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
}
