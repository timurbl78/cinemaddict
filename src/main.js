import ProfileView from './view/profile';
import MenuView from './view/menu';
import FooterStatisticsView from './view/footer-statistics';

import BoardPresenter from './presenter/board';

import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

import {render, RenderPosition} from './utils/render';


const FILMS_COUNT = 23;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
}));
const filters = generateFilter(data);

const siteBodyElemnt = document.querySelector('body');
const siteHeaderElement = siteBodyElemnt.querySelector('.header');
const siteMainElement = siteBodyElemnt.querySelector('.main');
const siteFooterElement = siteBodyElemnt.querySelector('.footer');

render(siteHeaderElement, new ProfileView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement);
boardPresenter.init(data);

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView(data.length).getElement(), RenderPosition.BEFOREEND);
