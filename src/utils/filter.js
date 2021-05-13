import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (data) => data,
  [FilterType.WATCHLIST]: (data) => data.filter((el) => el.film.isInWatchlist),
  [FilterType.HISTORY]: (data) => data.filter((el) => el.film.isWatched),
  [FilterType.FAVORITES]: (data) => data.filter((el) => el.film.isFavorite),
};

