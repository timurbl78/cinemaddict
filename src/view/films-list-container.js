import AbstractView from './abstract';

export default class FilmsListContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return this._createFilmsListContainerTemplate();
  }

  _createFilmsListContainerTemplate() {

    return `<div class="films-list__container">
    </div>`;
  }
}
