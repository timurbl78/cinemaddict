import {createProfileTemplate} from './view/profile';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createFilmsContainerTemplate} from './view/films-container';
import {createFilmCardTemplate} from './view/film-card';
import {createFilmsListTemplate} from './view/films-list';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFilmsListExtraTemplate} from './view/films-list-extra';

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');

render(siteMainElement, createFilmsContainerTemplate(), 'beforeend');
const siteFilmsContainerElement = siteMainElement.querySelector('.films');
render(siteFilmsContainerElement, createFilmsListTemplate(), 'beforeend');
const siteFilmsListContainerElement = siteFilmsContainerElement.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(siteFilmsListContainerElement, createShowMoreButtonTemplate(), 'afterend');


render(siteFilmsContainerElement, createFilmsListExtraTemplate('Top rated'), 'beforeend');
render(siteFilmsContainerElement, createFilmsListExtraTemplate('Most commented'), 'beforeend');

const siteFilmsExtraListContainersElement = siteFilmsContainerElement.querySelectorAll('.films-list--extra');
siteFilmsExtraListContainersElement.forEach((list) => {
  const container = list.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(container, createFilmCardTemplate(), 'beforeend');
  }
});
