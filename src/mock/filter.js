const filmToFilterMap = {
  all: () => ({title: 'All movies'}),
  watchlist: (data) => ({
    title: 'Watchlist',
    count: data.filter((el) => el.film.isInWatchlist).length,
  }),
  history: (data) => ({
    title: 'History',
    count: data.filter((el) => el.film.isWatched).length,
  }),
  favorites: (data) => ({
    title: 'Favorites',
    count: data.filter((el) => el.film.isFavorite).length,
  }),
};

export const generateFilter = (data) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    const relusutData = countFilms(data);
    return {
      name: filterName,
      title: relusutData.title,
      count: relusutData.count,
    };
  });
};
