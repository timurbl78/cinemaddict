import SortView from '../view/sort';
import FilmsContainerView from '../view/films-container';
import NoFilmsView from '../view/no-films';
import FilmListPresenter from './film-list';
import { remove, render, RenderPosition } from '../utils/render';
import {sortDateDown, sortRatingDown} from '../utils/film';
import {filter} from '../utils/filter.js';
import {SortType, FilmListTitle, UserAction} from '../const.js';

export default class Board {
  constructor(boardContainer, popupContainer, moviesModel, filterModel, api) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._api = api;

    this._isBoardEmpty = false;

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
    this._filterModel.addObserver(this._handleFilmListChange);

    this._renderBoard();
  }

  _getMovies(sortType, isMainList = false) {
    let movies = this._moviesModel.getMovies().slice();

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
      this._isBoardEmpty = true;
      this._renderNoFilms();
      return;
    } else {
      remove(this._noFilmsComponent);
    }

    if (this._mainListPresenter !== null) {
      this._mainListPresenter.destroy();
    }
    if (this._topRatedListPresenter !== null) {
      this._topRatedListPresenter.destroy();
    }
    if (this._topCommentedListPresenter !== null) {
      this._topCommentedListPresenter.destroy();
    }

    this._renderSort();
    render(this._boardContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const mainListTitle = FilmListTitle.DEFAULT;
    this._mainListPresenter = new FilmListPresenter(this._api, this._filmsContainerComponent, this._popupContainer, mainListTitle, this._handleViewAction);
    this._mainListPresenter.init(this._getMovies(this._currentSortType, true));
    this._filmListPresenter[mainListTitle] = this._mainListPresenter;

    const topRatedListTitle = FilmListTitle.RATING;
    this._topRatedListPresenter = new FilmListPresenter(this._api, this._filmsContainerComponent, this._popupContainer, topRatedListTitle, this._handleViewAction, true);
    this._topRatedListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[topRatedListTitle] = this._topRatedListPresenter;

    const topCommentedListTitle = FilmListTitle.COMMENT;
    this._topCommentedListPresenter = new FilmListPresenter(this._api, this._filmsContainerComponent, this._popupContainer, topCommentedListTitle, this._handleViewAction, true);
    this._topCommentedListPresenter.init(this._getMovies(this._currentSortType));
    this._filmListPresenter[topCommentedListTitle] = this._topCommentedListPresenter;
  }

  _handleViewAction(userAction, listTitle, update, commentId, newComment) {
    switch (userAction) {
      case UserAction.UPDATE_FILM:
        this._api.updateMovie(update)
          .then((movie) => {
            this._moviesModel.updateMovie(listTitle, movie);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(commentId)
          .then(() => {
            this._moviesModel.updateMovie(listTitle, update);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._api.putComment(newComment, update.id)
          .then((movie) => {
            this._moviesModel.updateMovie(listTitle, movie);
          });
        break;
    }
  }

  _handleFilmListChange() {
    if (this._isBoardEmpty) {
      if (this._getMovies(this._currentSortType).length !== 0) {
        this._isBoardEmpty = false;
        this._clearBoard();
        this._renderBoard();
      }
    }
    for (const presenter in this._filmListPresenter) {
      this._filmListPresenter[presenter].init(this._getMovies(this._currentSortType, presenter === FilmListTitle.DEFAULT));
    }
  }

  destroy() {
    this._clearBoard();

    remove(this._filmsContainerComponent);

    this._moviesModel.removeObserver(this._handleFilmListChange);
    this._filterModel.removeObserver(this._handleFilmListChange);
  }

  _clearBoard() {
    this._mainListPresenter.destroy();
    this._topRatedListPresenter.destroy();
    this._topCommentedListPresenter.destroy();
    remove(this._sortComponent);
  }
}
