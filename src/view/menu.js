import {createElement} from '../utils';

export default class Menu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return this._createMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _createMenuTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter, index) => this._createFilterItemTemplate(filter, index === 0))
      .join('');
    return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  };

  _createFilterItemTemplate(filter, isChecked) {
    const {name, title, count} = filter;
    if (name === 'all') {
      return '<a href="#all" class="main-navigation__item">All movies</a>';
    }
    return `<a href="#${title.toLowerCase()}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${title} <span class="main-navigation__item-count">${count}</span></a>`;
  };
}
