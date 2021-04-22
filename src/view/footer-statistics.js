import AbstractView from './abstract';

export default class FooterStatistics extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return this._createFooterStatisticsTemplate();
  }

  _createFooterStatisticsTemplate() {
    return `<p>${this._number} movies inside</p>`;
  }
}
