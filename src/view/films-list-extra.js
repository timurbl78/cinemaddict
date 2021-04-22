import {createElement} from '../utils';

export default class FilmsListExtra {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return this._createFilmsListExtraTemplate();
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

  _createFilmsListExtraTemplate() {
    return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${this._title}</h2>

    <div class="films-list__container">
    </div>
    </section>`;
  }
}
