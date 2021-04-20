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
import { createFilmPopupTemplate } from './view/film-popup';
import {createFooterStatisticsTemplate} from './view/footer-statistics';

const FILMS_COUNT = 15;
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

for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(data[i]), 'beforeend');
}

render(siteFilmsListContainerElement, createShowMoreButtonTemplate(), 'afterend');


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
