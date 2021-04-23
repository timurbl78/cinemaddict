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
import NoFilmsView from './view/no-films';

import {generateFilm} from './mock/film';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

import {render, RenderPosition} from './utils/render';


const FILMS_COUNT = 23;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
}));
const filters = generateFilter(data);

const siteBodyElemnt = document.querySelector('body');
const siteHeaderElement = siteBodyElemnt.querySelector('.header');
const siteMainElement = siteBodyElemnt.querySelector('.main');
const siteFooterElement = siteBodyElemnt.querySelector('.footer');

const renderFilm = (filmsContainer, popupContainer, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const openPopup = () => {
    popupContainer.appendChild(filmPopupComponent.getElement());
  };

  const closePopup = () => {
    popupContainer.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.setOpenPopupClickHandler(() => {
    openPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmPopupComponent.setClosePopupClickHandler(() => {
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmsContainer, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (siteMainElement, data) => {
  const siteFilmsContainerComponent = new FilmsContainerView();
  const filmsListComponent = new FilmsListView();

  if (FILMS_COUNT === 0) {
    render(siteMainElement, siteFilmsContainerComponent.getElement(), RenderPosition.BEFOREEND);
    render(siteFilmsContainerComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
    render(filmsListComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, siteFilmsContainerComponent.getElement(), RenderPosition.BEFOREEND);
  render(siteFilmsContainerComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

  const siteFilmsListContainerElement = siteFilmsContainerComponent.getElement().querySelector('.films-list__container');

  if (data.length > FILMS_COUNT_PER_STEP) {
    const showMoreButtonComponent = new ShowMoreButtonView();
    let renderedFilmCount = FILMS_COUNT_PER_STEP;
    render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      data
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((el) => renderFilm(siteFilmsListContainerElement, siteBodyElemnt, el));

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= data.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  for (let i = 0; i < Math.min(data.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(siteFilmsListContainerElement, siteBodyElemnt, data[i]);
  }

  render(siteFilmsContainerComponent.getElement(), new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
  render(siteFilmsContainerComponent.getElement(), new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);

  const siteFilmsExtraListContainersElement = siteFilmsContainerComponent.getElement().querySelectorAll('.films-list--extra');
  siteFilmsExtraListContainersElement.forEach((list, index) => {
    const container = list.querySelector('.films-list__container');
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderFilm(container, siteBodyElemnt, data[index * FILMS_EXTRA_COUNT + i]);
    }
  });
};

render(siteHeaderElement, new ProfileView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, data);

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView(data.length).getElement(), RenderPosition.BEFOREEND);
