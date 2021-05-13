import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import NoFilmsView from '../view/no-films';
import FilmListPresenter from './film-list';
import { remove, render, RenderPosition } from '../utils/render';
import {sortDateDown, sortRatingDown} from '../utils/film';
import {filter} from '../utils/filter.js';
import {SortType, FilmListTitle} from '../const.js';

export default class Board {
  constructor(boardContainer, popupContainer, moviesModel, filterModel) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

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

    this._moviesModel.addObserver(this._handleFilmListChange);
    this._filterModel.addObserver(this._handleFilmListChange);
  }

  init() {
    // this._moviesModel.addObserver(this._handleFilmListChange);
    // this._filterModel.addObserver(this._handleFilmListChange);
    this._renderBoard();
  }

  _getMovies(sortType, isMainList = false) {
    let movies = this._moviesModel.getMovies();

    if (isMainList) {
      const filterType = this._filterModel.getFilter();
      movies = filter[filterType](movies);
    }

    switch (sortType) {
      case SortType.RATING:
        return movies.sort(sortRatingDown);
      case SortType.DATE:
        return movies.sort(sortDateDown);
      default:
        return movies;
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

    const mainListTitle = FilmListTitle.DEFAULT;
    this._mainListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, mainListTitle, this._handleViewAction);
    this._mainListPresenter.init(this._getMovies(this._currentSortType, true));
    this._filmListPresenter[mainListTitle] = this._mainListPresenter;

    const topRatedListTitle = FilmListTitle.RATING;
    this._topRatedListPresenter = new FilmListPresenter(this._filmsContainerComponent, this._popupContainer, topRatedListTitle, this._handleViewAction, true);
    this._topRatedListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[topRatedListTitle] = this._topRatedListPresenter;

    const topCommentedListTitle = FilmListTitle.COMMENT;
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
        this._filmListPresenter[presenter].init(this._getMovies(this._currentSortType, presenter === FilmListTitle.DEFAULT));
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
