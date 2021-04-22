import AbstractView from './abstract';

export default class FilmsListExtra extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return this._createFilmsListExtraTemplate();
  }

  _createFilmsListExtraTemplate() {
    return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${this._title}</h2>

    <div class="films-list__container">
    </div>
    </section>`;
  }
}
