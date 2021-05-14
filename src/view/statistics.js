import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { getMyMoviesByGenre, getWatchedMovies, getTopGenre, getTotalDuration, filter } from '../utils/statistics';
import {getStatus} from '../utils/film';
import { StatisticType } from '../const';

export default class Statistics extends SmartView {
  constructor(films) {
    super();

    this._films = films;
    this._chart = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._setChart(this._films);
    this._setFilterChangeHandler();
  }

  getTemplate() {
    return this._createStatisticsTemplate();
  }

  _createStatisticsTemplate() {
    const textList = this._generateStatisticListText(this._films);

    let amount = 0;
    this._films.forEach((movie) => {
      if (movie.film.isWatched) {
        amount++;
      }
    });

    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getStatus(amount)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${StatisticType.ALL}" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${StatisticType.TODAY}">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${StatisticType.WEEK}">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${StatisticType.MONTH}">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${StatisticType.YEAR}">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      ${textList}
    </ul>

    <div class="statistic__chart-wrap">
    </div>

  </section>`;
  }

  _generateStatisticListText(films) {
    const watchedMovies = getWatchedMovies(films);
    const topGenre = getTopGenre(films);
    const duration = getTotalDuration(watchedMovies);

    return `<li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text">${Math.floor(duration / 60)} <span class="statistic__item-description">h</span> ${duration - Math.floor(duration / 60) * 60} <span class="statistic__item-description">m</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${topGenre ? topGenre : '&#0151'}</p>
  </li>`;
  }

  _setChart(films) {
    const BAR_HEIGHT = 50;
    const canvasContainer = this.getElement().querySelector('.statistic__chart-wrap');
    canvasContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.classList.add('statistic__chart');
    canvas.width = 1000;

    canvasContainer.appendChild(canvas);

    if (this._chart !== null) {
      this._chart = null;
    }

    const movies = getMyMoviesByGenre(films);

    canvas.height = BAR_HEIGHT * Object.keys(movies).length;

    this._chart = new Chart(canvas, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: Object.keys(movies),
        datasets: [{
          data: Object.values(movies),
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: '#ffffff',
            anchor: 'start',
            align: 'start',
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#ffffff',
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _updateInfo(films) {
    const textList = this._generateStatisticListText(films);

    this.getElement().querySelector('.statistic__text-list').innerHTML = textList;
  }

  _filterChangeHandler(evt) {
    const filteredFilms = filter[evt.target.value](this._films);
    this._setChart(filteredFilms);
    this._updateInfo(filteredFilms);
  }

  _setFilterChangeHandler() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._filterChangeHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._chart !== null) {
      this._chart = null;
    }
  }
}
