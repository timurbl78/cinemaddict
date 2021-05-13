import ProfileView from './view/profile';
import MenuView from './view/menu';
import FooterStatisticsView from './view/footer-statistics';

import BoardPresenter from './presenter/board';
import MoviesModel from './model/movies';

import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

import {render, RenderPosition} from './utils/render';
import { nanoid } from 'nanoid';


const FILMS_COUNT = 23;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  id: nanoid(),
  film: generateFilm(),
  comments: generateComments(),
}));
const filters = generateFilter(data);

const moviesModel = new MoviesModel();
moviesModel.setMovies(data);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
//const siteFooterElement = siteBodyElement.querySelector('.footer');

render(siteHeaderElement, new ProfileView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
const footerStatistics = siteBodyElement.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView(data.length).getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, siteBodyElement, moviesModel);
boardPresenter.init();
