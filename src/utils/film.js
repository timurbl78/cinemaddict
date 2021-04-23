import dayjs from 'dayjs';

export const humanizeFilmDuration = (number) => {
  let hours = Math.floor(number / 60);
  const minutes = number - hours * 60;
  hours = hours ? `${hours}h` : '';
  return `${hours} ${minutes}m`;
};

export const generateRandomDate = (yearMin, yearMax) => {
  const yearMinjs = dayjs().year(yearMin);
  const yearMaxjs = dayjs().year(yearMax);
  return new Date(yearMinjs.valueOf() + Math.random() * (yearMaxjs.valueOf() - yearMinjs.valueOf()));
};

export const getStatus = (amount) => {
  if (amount === 0) {
    return '';
  }
  if (amount < 11) {
    return 'Novice';
  }
  if (amount < 21) {
    return 'Fan';
  }
  return 'Movie Buff';
};
