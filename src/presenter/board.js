import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import NoFilmsView from '../view/no-films';
import FilmListPresenter from './film-list';
import { remove, render, RenderPosition } from '../utils/render';
import {sortDateDown, sortRatingDown} from '../utils/film';
import {SortType, filmListTitle} from '../const.js';

export default class Board {
  constructor(boardContainer, popupContainer, moviesModel) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;

    this._filmListPresenter = {};

    this._mainListPresenter = null;
    this._topRatedListPresenter = null;
    this._topCommentedListPresenter = null;

    this._currentSortType = SortType.DEFAULT;

    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsComponent = new NoFilmsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmListChange = this._handleFilmListChange.bind(this);
  }

  init() {
    this._moviesModel.addObserver(this._handleFilmListChange);
    this._renderBoard();
  }

  _getMovies(sortType) {
    switch (sortType) {
      case SortType.RATING:
        return this._moviesModel.getMovies().slice().sort(sortRatingDown);
      case SortType.DATE:
        return this._moviesModel.getMovies().slice().sort(sortDateDown);
      default:
        return this._moviesModel.getMovies().slice();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._currentSortType = sortType;
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
    if (this._getMovies(this._currentSortType).length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._boardContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const mainListTitle = filmListTitle.DEFAULT;
    this._mainListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, mainListTitle, this._handleViewAction);
    this._mainListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[mainListTitle] = this._mainListPresenter;

    const topRatedListTitle = filmListTitle.RATING;
    this._topRatedListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, topRatedListTitle, this._handleViewAction, true);
    this._topRatedListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[topRatedListTitle] = this._topRatedListPresenter;

    const topCommentedListTitle = filmListTitle.COMMENT;
    this._topCommentedListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, topCommentedListTitle, this._handleViewAction, true);
    this._topCommentedListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[topCommentedListTitle] = this._topCommentedListPresenter;
  }

  _handleViewAction(listTitle, update) {
    this._moviesModel.updateMovie(listTitle, update);
  }

  _handleFilmListChange(listTitle) {
    for (const presenter in this._filmListPresenter) {
      if (presenter !== listTitle) {
        this._filmListPresenter[presenter].init(this._getMovies(this._currentSortType));
      }
    }
  }

  _clearBoard() {
    this._mainListPresenter.destroy();
    this._topRatedListPresenter.destroy();
    this._topCommentedListPresenter.destroy();
    remove(this._sortComponent);
  }
}
