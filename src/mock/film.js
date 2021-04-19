import {
  getRandomInteger,
  getRandom,
  getRandomArrayItem,
  getRandomArrayItems
} from '../utils'

const FILM_GENRES_MIN = 1;
const FILM_GENRES_MAX = 2;
const FILM_RELEASE_MIN = 1970;
const FILM_RELEASE_MAX = 2021;
const FILM_RATING_MIN = 4.0;
const FILM_RATING_MAX = 10.0;

const generateFilmName = () => {
  const films = [
    'Godzilla vs. Kong',
    'The Lord of the Rings: The Two Towers',
    'Chernobyl: Abyss',
    'A Dog Named Palma',
    'The Unholy',
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other',
  ];

  return getRandomArrayItem(films);
}

const generateDescription = () => {
  const randomText = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const amount = getRandomInteger(0, randomText.length - 1);
  let description = '';

  for (let i = 0; i < amount; i++) {
    description += randomText[getRandomInteger(0, randomText.length - 1)];
  }

  return description;
}

const generateComments = () => {
  return ``;
};

const getPoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  return `./images/posters/${getRandomArrayItem(posters)}`;
}

const generateGenres = () => {
  const genres = [
    'Crime',
    'Drama',
    'Romance',
    'Adventure',
    'Comedy',
    'Family',
    'Fantasy',
    'Sci-Fi',
    'Animation',
    'Musical',
    'Film-Noir',
    'Mystery',
    'Thriller',
  ];

  return getRandomArrayItems(genres, FILM_GENRES_MIN, FILM_GENRES_MAX);
}

const generateRating = () => {
  const randomRating = getRandom(FILM_RATING_MIN, FILM_RATING_MAX);

  return randomRating.toFixed(1);
}

export const generateFilm = () => {
  return {
    name: generateFilmName(),
    poster: getPoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    year: getRandomInteger(FILM_GENRES_MIN, FILM_GENRES_MAX),
    genres: generateGenres(),
  };
}
