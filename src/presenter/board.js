import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import FilmsListView from '../view/films-list';
import ShowMoreButtonView from '../view/show-more-button';
import FilmsListExtraView from '../view/films-list-extra';
import NoFilmsView from '../view/no-films';
import FilmPresenter from './film';
import { remove, render, RenderPosition } from '../utils/render';
import {updateItem} from '../utils/common'

const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortComponent = new SortView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    console.log(updatedFilm);
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.film.id].init(updatedFilm);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(filmsContainer, popupContainer, film) {
    const filmPresenter = new FilmPresenter(filmsContainer, popupContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.film.id] = filmPresenter;
  }

  _renderFilms(from, to, filmsListContainer) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(filmsListContainer, this._popupContainer, boardFilm));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    let renderedFilmCount = this._renderedFilmCount;

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + this._renderedFilmCount)
        .forEach((el) => this._renderFilm(this._filmsMainListContainer, this._popupContainer, el));

      renderedFilmCount += this._renderedFilmCount;

      if (renderedFilmCount >= this._boardFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmsList() {
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._popupContainer = document.querySelector('body');
    this._filmsMainListContainer = this._filmsContainerComponent.getElement().querySelector('.films-list__container');

    this._renderFilms(0, Math.min(this._boardFilms.length, this._renderedFilmCount), this._filmsMainListContainer);

    if (this._boardFilms.length > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  // _renderFilmsExtraList() {
  //   render(this._filmsContainerComponent, new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
  //   render(this._filmsContainerComponent, new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);

  //   const siteFilmsExtraListContainersElement = this._filmsContainerComponent.getElement().querySelectorAll('.films-list--extra');
  //   siteFilmsExtraListContainersElement.forEach((list, index) => {
  //     const container = list.querySelector('.films-list__container');
  //     for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  //       this._renderFilm(container, this._popupContainer, this._boardFilms[index * FILMS_EXTRA_COUNT + i]);
  //     }
  //   });
  // }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      render(this.__boardContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
      render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._boardContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
    //this._renderFilmsExtraList();
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }
}
