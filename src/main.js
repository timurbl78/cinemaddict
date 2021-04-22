import ProfileView from './view/profile';
import MenuView from './view/menu';
import SortView from './view/sort';
import FilmsContainerView from './view/films-container';
import FilmCardView from './view/film-card';
import FilmsListView from './view/films-list';
import ShowMoreButtonView from './view/show-more-button';
import FilmsListExtraView from './view/films-list-extra';
import FilmPopupView from './view/film-popup';
import FooterStatisticsView from './view/footer-statistics';

import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

import {renderElement, RenderPosition} from './utils';


const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const data = new Array(FILMS_COUNT + FILMS_EXTRA_COUNT * 2).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
}));
const filters = generateFilter(data);

const siteBodyElemnt = document.querySelector('body');
const siteHeaderElement = siteBodyElemnt.querySelector('.header');
const siteMainElement = siteBodyElemnt.querySelector('.main');
const siteFooterElement = siteBodyElemnt.querySelector('.footer');

renderElement(siteHeaderElement, new ProfileView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const siteFilmsContainerComponent = new FilmsContainerView();
renderElement(siteMainElement, siteFilmsContainerComponent.getElement(), RenderPosition.BEFOREEND);
const filmsListComponent = new FilmsListView();
renderElement(siteFilmsContainerComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
const siteFilmsListContainerElement = siteFilmsContainerComponent.getElement().querySelector('.films-list__container');

if (data.length > FILMS_COUNT_PER_STEP) {
  const showMoreButtonComponent = new ShowMoreButtonView();
  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();

    data
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((el) => renderElement(siteFilmsListContainerElement, new FilmCardView(el).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= data.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

for (let i = 0; i < Math.min(data.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(siteFilmsListContainerElement, new FilmCardView(data[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(siteFilmsContainerComponent.getElement(), new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
renderElement(siteFilmsContainerComponent.getElement(), new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);

const siteFilmsExtraListContainersElement = siteFilmsContainerComponent.getElement().querySelectorAll('.films-list--extra');
siteFilmsExtraListContainersElement.forEach((list, index) => {
  const container = list.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    renderElement(container, new FilmCardView(data[FILMS_COUNT + index * FILMS_EXTRA_COUNT + i]).getElement(), RenderPosition.BEFOREEND);
  }
});

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
renderElement(footerStatistics, new FooterStatisticsView(data.length).getElement(), RenderPosition.BEFOREEND);


//renderElement(siteBodyElemnt, new FilmPopupView(data[0]).getElement(), RenderPosition.BEFOREEND);
