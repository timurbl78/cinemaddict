import AbstractView from './abstract';

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return this._createShowMoreButtonTemplate();
  }

  _createShowMoreButtonTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }
}
