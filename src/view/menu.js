const createFilterItemTemplate = (filter, isChecked) => {
  const {name, title, count} = filter;
  if (name === 'all') {
    return '<a href="#all" class="main-navigation__item">All movies</a>';
  }
  return `<a href="#${title.toLowerCase()}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${title} <span class="main-navigation__item-count">${count}</span></a>`
}

export const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
