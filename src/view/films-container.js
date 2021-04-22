import AbstractView from './abstract';

export default class FilmsContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return this._createFilmsContainerTemplate();
  }

  _createFilmsContainerTemplate() {
    return '<section class="films"></section>';
  }
}
