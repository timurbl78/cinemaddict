import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import NoFilmsView from '../view/no-films';
import FilmListPresenter from './film-list';
import { remove, render, RenderPosition } from '../utils/render';
import {sortDateDown, sortRatingDown} from '../utils/film';
import {SortType} from '../const.js';

export default class Board {
  constructor(boardContainer, popupContainer) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;

    this._filmPresenter = {};

    this._mainListPresenter = null;
    this._topRatedListPresenter = null;
    this._topCommentedListPresenter = null;

    this._currentSortType = SortType.DEFAULT;

    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsComponent = new NoFilmsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._boardFilms.sort(sortRatingDown);
        break;
      case SortType.DATE:
        this._boardFilms.sort(sortDateDown);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._sortFilms(sortType);
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._boardContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._boardContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const mainListTitle = 'All movies. Upcoming';
    this._mainListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, mainListTitle);
    this._mainListPresenter.init(this._boardFilms);

    const topRatedListTitle = 'Top rated';
    this._topRatedListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, topRatedListTitle, true);
    this._topRatedListPresenter.init(this._boardFilms);

    const topCommentedListTitle = 'Top commented';
    this._topCommentedListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, topCommentedListTitle, true);
    this._topCommentedListPresenter.init(this._boardFilms);
  }

  _clearBoard() {
    this._mainListPresenter.destroy();
    this._topRatedListPresenter.destroy();
    this._topCommentedListPresenter.destroy();
    remove(this._showMoreButtonComponent);
    remove(this._sortComponent);
  }
}
