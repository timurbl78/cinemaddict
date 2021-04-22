import {createElement} from '../utils';

export default class FooterStatistics {
  constructor(number) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return this._createFooterStatisticsTemplate();
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

  _createFooterStatisticsTemplate() {
    return `<p>${this._number} movies inside</p>`;
  }
}
