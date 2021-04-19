import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayItem} from '../utils';

const COMMENTS_MIN_NUMBER = 0;
const COMMENTS_MAX_NUMBER = 10;

const generateEmoji = () => {
  const emojis = ['smile', 'sleeping', 'puke', 'angry'];

  return getRandomArrayItem(emojis);
};

const generateText = () => {
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
  let text = '';

  for (let i = 0; i < amount; i++) {
    text += randomText[getRandomInteger(0, randomText.length - 1)];
  }

  return text;
};

const generateAuthor = () => {
  const authors = [
    'Ayako Nicoletta',
    'Cyprian Caesonius',
    'Edita Valerian',
    'Sumantra Dominique',
    'Edith Bysshe',
    'Liba Jayce',
  ];

  return getRandomArrayItem(authors);
};

const generateDate = () => {
  const daysGap = getRandomInteger(-10, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generateComments = () => {
  const amount = getRandomInteger(COMMENTS_MIN_NUMBER, COMMENTS_MAX_NUMBER);

  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push({
      text: generateText(),
      emoji: generateEmoji(),
      author: generateAuthor(),
      date:  generateDate(),
    })
  }

  return comments;
};
