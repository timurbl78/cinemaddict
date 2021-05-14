import ProfileView from './view/profile';
import FooterStatisticsView from './view/footer-statistics';

import BoardPresenter from './presenter/board';
import MenuPresenter from './presenter/menu';
import MoviesModel from './model/movies';
import FilterModel from './model/filter';

import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';

import { render, RenderPosition } from './utils/render';
import { nanoid } from 'nanoid';


const FILMS_COUNT = 23;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  id: nanoid(),
  film: generateFilm(),
  comments: generateComments(),
}));

const moviesModel = new MoviesModel();
moviesModel.setMovies(data);
const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');

render(siteHeaderElement, new ProfileView(moviesModel).getElement(), RenderPosition.BEFOREEND);
const footerStatistics = siteBodyElement.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView(data.length).getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, siteBodyElement, moviesModel, filterModel);
const menuPresenter = new MenuPresenter(siteMainElement, filterModel, moviesModel, boardPresenter);

menuPresenter.init();
boardPresenter.init();
