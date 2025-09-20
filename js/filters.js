import { renderPictures, picturesContainer } from './render-thumbnails.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');

let originalPhotos = [];

const updatePhotos = (photos) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderPictures(photos);
};

const getRandomArray = (array) => array.slice().sort(() => Math.random() - 0.5);

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const applyFilter = debounce((filterId) => {
  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-random':
      filteredPhotos = getRandomArray(originalPhotos).slice(0, RANDOM_PHOTOS_COUNT);
      break;

    case 'filter-discussed':
      filteredPhotos = [...originalPhotos].sort(sortByComments);
      break;

    default:
      filteredPhotos = [...originalPhotos];
      break;
  }

  updatePhotos(filteredPhotos);
}, 500);

const onFilterClick = (evt) => {
  const activeButton = filtersContainer.querySelector('.img-filters__button--active');

  if (evt.target.classList.contains('img-filters__button') && evt.target !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    applyFilter(evt.target.id);
  }
};

const initFilters = (photos) => {
  originalPhotos = photos.slice();
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
