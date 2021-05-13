import MenuView from '../view/menu';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class Menu {
  constructor(menuContainer, filterModel, moviesModel) {
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._menuCompoment = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevMenuComponent = this._menuCompoment;

    this._menuCompoment = new MenuView(filters, this._filterModel.getFilter());
    this._menuCompoment.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevMenuComponent === null) {
      render(this._menuContainer, this._menuCompoment, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._menuCompoment, prevMenuComponent);
    remove(prevMenuComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    // TODO: dfgfdg
    this._filterModel.setFilter('', filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](movies).length,
      },
    ];
  }
}
