import ProfileView from './view/profile';
import FooterStatisticsView from './view/footer-statistics';

import BoardPresenter from './presenter/board';
import MenuPresenter from './presenter/menu';
import MoviesModel from './model/movies';
import FilterModel from './model/filter';

import Api from './api';

import { render, RenderPosition } from './utils/render';


const AUTHORIZATION = 'Basic eo0w1890ir39889a';
const END_POINT = 'https://12.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);


const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');


api.getMovies().then((movies) => {
  render(siteHeaderElement, new ProfileView(moviesModel).getElement(), RenderPosition.BEFOREEND);
  const footerStatistics = siteBodyElement.querySelector('.footer__statistics');
  render(footerStatistics, new FooterStatisticsView(movies.length).getElement(), RenderPosition.BEFOREEND);

  moviesModel.setMovies(movies);
  const boardPresenter = new BoardPresenter(siteMainElement, siteBodyElement, moviesModel, filterModel, api);
  const menuPresenter = new MenuPresenter(siteMainElement, filterModel, moviesModel, boardPresenter);

  menuPresenter.init();
  boardPresenter.init();
});
