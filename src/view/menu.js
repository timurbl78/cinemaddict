import AbstractView from './abstract';
import { FilterType } from '../const';

export default class Menu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
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
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }

  _createFilterItemTemplate(filter) {
    const {type, name, count} = filter;
    if (type === FilterType.ALL) {
      return `<a href="#all" data-type="${type}" class="main-navigation__item">All movies</a>`;
    }
    return `<a href="#${name.toLowerCase()}" data-type="${type}" class="main-navigation__item ${type === this._currentFilterType ? 'main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('main-navigation__item')) {
      this._callback.filterTypeChange(evt.target.dataset.type);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
