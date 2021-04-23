import {
  getRandomInteger,
  getRandom,
  getRandomArrayItem,
  getRandomArrayItems
} from '../utils/common';
import {generateRandomDate} from '../utils/film';

const FILM_GENRES_MIN = 1;
const FILM_GENRES_MAX = 2;
const FILM_RELEASE_MIN = 1970;
const FILM_RELEASE_MAX = 2021;
const FILM_RATING_MIN = 4.0;
const FILM_RATING_MAX = 10.0;
const DURATION_MIN = 50;
const DURATION_MAX = 160;

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
};

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
};

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
};

const generateRating = () => {
  const randomRating = getRandom(FILM_RATING_MIN, FILM_RATING_MAX);

  return randomRating.toFixed(1);
};

const generateDuration = () => {
  return getRandomInteger(DURATION_MIN, DURATION_MAX);
};

const generateAge = () => {
  const ages = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  return getRandomArrayItem(ages);
};

const generateCountry = () => {
  const countries = [
    'Russia',
    'Germany',
    'USA',
    'France',
    'Italy',
    'China',
    'Japan',
  ];

  return getRandomArrayItem(countries);
};

const generateDirector = () => {
  const directors = [
    'Christopher Nolan',
    'Quentin Tarantino',
    'Steven Spielberg',
    'Richard Linklater',
    'Alfonso Cuaron',
    'Martin Scorsese',
    'Denis Villeneuve',
    'David Fincher',
  ];

  return getRandomArrayItem(directors);
};

const generateWriters = () => {
  const writers = [
    'Billy Wilder',
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Robert Towne',
    'William Goldman',
    'Charlie Kaufman',
    'Woody Allen',
  ];

  return getRandomArrayItems(writers, 2, 3);
};

const generateActors = () => {
  const actors = [
    'Robert De Niro',
    'Jack Nicholson',
    'Marlon Brando',
    'Denzel Washington',
    'Katharine Hepburn',
    'Humphrey Bogart',
    'Meryl Streep',
    'Daniel Day-Lewis',
    'Sidney Poitier',
    'Clark Gable',
    'Margot Robbie',
  ];

  return getRandomArrayItems(actors, 2, 5);
};

export const generateFilm = () => {
  const name = generateFilmName();

  return {
    name: name,
    nameOriginal: name,
    poster: getPoster(),
    description: generateDescription(),
    rating: generateRating(),
    date: generateRandomDate(FILM_RELEASE_MIN, FILM_RELEASE_MAX),
    genres: generateGenres(),
    duration: generateDuration(),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    age: generateAge(),
    country: generateCountry(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
  };
};
