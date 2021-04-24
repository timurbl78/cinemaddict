import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import FilmCardView from '../view/film-card';
import FilmsListView from '../view/films-list';
import ShowMoreButtonView from '../view/show-more-button';
import FilmsListExtraView from '../view/films-list-extra';
import FilmPopupView from '../view/film-popup';
import NoFilmsView from '../view/no-films';
import { remove, render, RenderPosition } from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortComponent = new SortView();
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(filmsContainer, popupContainer, film) {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmPopupView(film);

    const openPopup = () => {
      popupContainer.appendChild(filmPopupComponent.getElement());
    };

    const closePopup = () => {
      popupContainer.removeChild(filmPopupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.setOpenPopupClickHandler(() => {
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmPopupComponent.setClosePopupClickHandler(() => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND);
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
    let renderedFilmCount = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((el) => this._renderFilm(this._filmsMainListContainer, this._popupContainer, el));

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= this._boardFilms.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  _renderFilmsList() {
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._popupContainer = document.querySelector('body');
    this._filmsMainListContainer = this._filmsContainerComponent.getElement().querySelector('.films-list__container');

    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP), this._filmsMainListContainer);

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsExtraList() {
    render(this._filmsContainerComponent, new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);

    const siteFilmsExtraListContainersElement = this._filmsContainerComponent.getElement().querySelectorAll('.films-list--extra');
    siteFilmsExtraListContainersElement.forEach((list, index) => {
      const container = list.querySelector('.films-list__container');
      for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
        this._renderFilm(container, this._popupContainer, this._boardFilms[index * FILMS_EXTRA_COUNT + i]);
      }
    });
  }

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
    this._renderFilmsExtraList();
  }
}
