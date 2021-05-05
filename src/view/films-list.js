import AbstractView from './abstract';

export default class FilmsList extends AbstractView {
  constructor(title, isExtra) {
    super();
    this._title = title;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return this._createFilmsListTemplate();
  }

  _createFilmsListTemplate() {
    let extraClass = '';
    let hideTitleClass = '';
    if (this._isExtra) {
      extraClass = 'films-list--extra';
    } else {
      hideTitleClass = 'visually-hidden';
    }

    return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${hideTitleClass}">${this._title}</h2>

    </section>`;
  }
}
