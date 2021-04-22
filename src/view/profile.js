import {getStatus} from '../utils';
import AbstractView from './abstract';

export default class Profile extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return this._createProfileTemplate();
  }

  _createProfileTemplate() {
    let amount = 0;
    this._filters.forEach((filter) => {
      if (filter.name === 'history') {
        amount  = filter.count;
      }
    });
    return `<section class="header__profile profile">
      <p class="profile__rating">${getStatus(amount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}
