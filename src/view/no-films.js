import AbstractView from './abstract';

export default class NoTask extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return this._createNoFilmsTemplate();
  }

  _createNoFilmsTemplate() {
    return '<h2 class="films-list__title">There are no movies in our database</h2>';
  }
}
