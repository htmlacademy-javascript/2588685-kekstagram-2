import { photos } from './generate-photos.js';


const templateForThumbnails = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();

photos.forEach(({ url, description, likes, comments }) => {
  const thumbnail = templateForThumbnails.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnailsFragment.append(thumbnail);
});

picturesContainer.append(thumbnailsFragment);
