import {createElement} from '../utils';


export default class FilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return this._createFilmsContainerTemplate();
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

  _createFilmsContainerTemplate() {
    return '<section class="films"></section>';
  };
}
