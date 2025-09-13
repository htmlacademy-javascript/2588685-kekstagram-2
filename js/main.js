import { photos } from './generate-photos.js';
import { openBigPicture } from './render-big-pictures.js';
import { picturesContainer, renderPictures } from './render-thumbnails.js';

renderPictures(photos);

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.id);
  }
});
