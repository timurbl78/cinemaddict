import {getStatus} from '../utils'

export const createProfileTemplate = (filters) => {
  let amount = 0;
  filters.forEach(filter => {
    if (filter.name === 'history') {
      amount  = filter.count;
    }
  });
  console.log(amount);
  return `<section class="header__profile profile">
    <p class="profile__rating">${getStatus(amount)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
