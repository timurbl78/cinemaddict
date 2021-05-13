import dayjs from 'dayjs';
import he from 'he';
import SmartView from './smart';
import {humanizeFilmDuration} from '../utils/film';
import { nanoid } from 'nanoid';
import {KeyCodes} from '../const';

export default class FilmPopup extends SmartView {
  constructor(data) {
    super();
    this._data = FilmPopup.parseDataToState(data);

    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._chooseEmojiClickHandler = this._chooseEmojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._sendCommentHandler = this._sendCommentHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return this._createFilmPopupTemplate();
  }

  _createFilmPopupTemplate() {
    const film = this._data.film;
    const comments = this._data.comments;
    const commentsTemplate = this._createFilPopupCommentsTemplate(comments);

    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${film.poster}" alt="">

              <p class="film-details__age">${film.age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.name}</h3>
                  <p class="film-details__title-original">Original: ${film.nameOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dayjs(film.date).format('D MMMM YYYY')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizeFilmDuration(film.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${film.genres.length == 1 ? 'Genre' : 'Genres'}</td>
                  <td class="film-details__cell">
                    ${film.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isInWatchlist ? 'checked' : ''}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isWatched ? 'checked' : ''}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorite ? 'checked' : ''}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        ${commentsTemplate}
      </form>
    </section>`;
  }

  _createFilPopupCommentsTemplate(comments) {
    return `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">

        ${comments.map((comment) => ` <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment.text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
            <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
          </p>
        </div>
      </li>`).join('')}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>`;
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();

    this._callback.closePopupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _chooseEmojiClickHandler(evt) {
    evt.preventDefault();
    const emojiPlace = this.getElement().querySelector('.film-details__add-emoji-label');
    emojiPlace.innerHTML = this._createEmojiImage(evt.target.value);
    this.updateData({currentCommentEmoji: evt.target.value}, true);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({currentCommentText: evt.target.value}, true);
  }

  _createEmojiImage(emojiName) {
    return `<img src="images/emoji/${emojiName}.png" alt="emoji-${emojiName}" width="55" height="55">`;
  }

  _sendCommentHandler(evt) {

    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === KeyCodes.ENTER) {
      if (!this._data.currentCommentEmoji || !this._data.currentCommentText) {
        return;
      }
      this._data = FilmPopup.parseStateToData(this._data);
      this.updateElement();
      this._callback.addComment(this._data);
    }
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      this._data.comments = this._data.comments.filter((value) => value.id !== evt.target.dataset.id);
      this.updateElement();
      this._callback.deleteComment(this._data);
    }
  }

  setClosePopupClickHandler(callback) {
    this._callback.closePopupClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._watchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setAddCommentHandler(callback) {
    this._callback.addComment = callback;
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteComment = callback;
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._chooseEmojiClickHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
    this.getElement().addEventListener('keydown', this._sendCommentHandler);
    this.getElement().querySelectorAll('.film-details__comment').forEach((el) => {
      el.addEventListener('click', this._deleteClickHandler);
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClosePopupClickHandler(this._callback.closePopupClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
  }

  static parseDataToState(filmData) {
    return Object.assign(
      {},
      filmData,
      {
        currentCommentEmoji: '',
        currentCommentText: '',
      },
    );
  }

  static parseStateToData(filmData) {
    filmData = Object.assign({}, filmData);
    const newComment = {};
    newComment.id = nanoid();
    newComment.text = filmData.currentCommentText;
    newComment.emoji = filmData.currentCommentEmoji;
    newComment.author = 'You'; // TODO
    newComment.date = dayjs();
    filmData.comments.push(newComment);
    delete filmData.currentCommentText;
    delete filmData.currentCommentEmoji;
    return filmData;
  }
}
