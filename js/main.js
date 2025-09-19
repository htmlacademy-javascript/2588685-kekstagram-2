import { getData } from './api.js';
import { openBigPicture, setPhotos } from './render-big-pictures.js';
import { picturesContainer, renderPictures } from './render-thumbnails.js';
import './validate-form.js';
import './handle-form.js';
import './edit-picture.js';

import { showSuccessMessage } from './handle-form.js';
window.showSuccessMessage = showSuccessMessage;

const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = errorTemplate.cloneNode(true);

  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
};

/*getData()
  .then((photos) => {
    renderPictures(photos);
    setPhotos(photos);
  })
  .catch(() => {
    showDataError();
  });
*/

const init = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
    setPhotos(photos);
  } catch (error) {
    window.console.error('Ошибка при загрузке данных:', error.message);
    showDataError();
  }
};

init();

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.id);
  }
});
