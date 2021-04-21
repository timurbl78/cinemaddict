import {createProfileTemplate} from './view/profile';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createFilmsContainerTemplate} from './view/films-container';
import {createFilmCardTemplate} from './view/film-card';
import {createFilmsListTemplate} from './view/films-list';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFilmsListExtraTemplate} from './view/films-list-extra';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';
//import { createFilmPopupTemplate } from './view/film-popup';
import {createFooterStatisticsTemplate} from './view/footer-statistics';


const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const data = new Array(FILMS_COUNT + FILMS_EXTRA_COUNT * 2).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
}));
const filters = generateFilter(data);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(filters), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');

render(siteMainElement, createFilmsContainerTemplate(), 'beforeend');
const siteFilmsContainerElement = siteMainElement.querySelector('.films');
render(siteFilmsContainerElement, createFilmsListTemplate(), 'beforeend');
const siteFilmsListContainerElement = siteFilmsContainerElement.querySelector('.films-list__container');

if (data.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  render(siteFilmsListContainerElement, createShowMoreButtonTemplate(), 'afterend');

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    data
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((el) => render(siteFilmsListContainerElement, createFilmCardTemplate(el), 'beforeend'));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= data.length) {
      showMoreButton.remove();
    }
  });
}

for (let i = 0; i < Math.min(data.length, FILMS_COUNT_PER_STEP); i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(data[i]), 'beforeend');
}

render(siteFilmsContainerElement, createFilmsListExtraTemplate('Top rated'), 'beforeend');
render(siteFilmsContainerElement, createFilmsListExtraTemplate('Most commented'), 'beforeend');

const siteFilmsExtraListContainersElement = siteFilmsContainerElement.querySelectorAll('.films-list--extra');
siteFilmsExtraListContainersElement.forEach((list, index) => {
  const container = list.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(container, createFilmCardTemplate(data[FILMS_COUNT + index * FILMS_EXTRA_COUNT + i]), 'beforeend');
  }
});

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
render(footerStatistics, createFooterStatisticsTemplate(data.length), 'beforeend');


//render(siteFooterElement, createFilmPopupTemplate(data[0]), 'afterend');
