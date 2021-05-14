import AbstractView from './abstract';
import { FilterType, MenuItem } from '../const';

export default class Menu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._window = MenuItem.MOVIES;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuItemChange = this._menuItemChange.bind(this);
  }

  getTemplate() {
    return this._createMenuTemplate();
  }

  _createMenuTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._createFilterItemTemplate(filter))
      .join('');
    return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional" data-menu="${MenuItem.STATISTICS}">Stats</a>
    </nav>`;
  }

  _createFilterItemTemplate(filter) {
    const {type, name, count} = filter;
    if (type === FilterType.ALL) {
      return `<a href="#all" data-type="${type}" data-menu="${MenuItem.MOVIES}" class="main-navigation__item">All movies</a>`;
    }
    return `<a href="#${name.toLowerCase()}" data-type="${type}" class="main-navigation__item ${type === this._currentFilterType ? 'main-navigation__item--active' : ''}">${name} <span data-type="${type}" class="main-navigation__item-count">${count}</span></a>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (this._window === MenuItem.STATISTICS) {
      this._callback.menuClick(MenuItem.MOVIES);
      this._window = MenuItem.MOVIES;
    }

    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  _menuItemChange(evt) {
    evt.preventDefault();

    if (this._window !== MenuItem.STATISTICS) {
      this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
        if (element.classList.contains('main-navigation__item--active')) {
          element.classList.remove('main-navigation__item--active');
          this._currentFilterType = FilterType.ALL;
        }
      });
      this._callback.menuClick(MenuItem.STATISTICS);
      this._window = MenuItem.STATISTICS;
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
      element.addEventListener('click', this._filterTypeChangeHandler);
    });
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._menuItemChange);
  }
}
