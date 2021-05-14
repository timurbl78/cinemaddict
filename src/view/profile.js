import {getStatus} from '../utils/film';
import AbstractView from './abstract';

export default class Profile extends AbstractView {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
  }

  getTemplate() {
    return this._createProfileTemplate();
  }

  _createProfileTemplate() {
    let amount = 0;
    this._moviesModel.getMovies().forEach((movie) => {
      if (movie.film.isWatched) {
        amount++;
      }
    });

    return `<section class="header__profile profile">
      <p class="profile__rating">${getStatus(amount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}
