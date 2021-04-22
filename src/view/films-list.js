import AbstractView from './abstract';

export default class FilmsList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return this._createFilmsListTemplate();
  }

  _createFilmsListTemplate() {
    return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
    </div>
    </section>`;
  }
}
