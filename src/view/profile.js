import {getStatus, createElement} from '../utils';


export default class Profile {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return this._createProfileTemplate();
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
