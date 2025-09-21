import { getData, showDataError } from './api.js';
import { setPhotos } from './render-big-pictures.js';
import { renderPictures } from './render-thumbnails.js';
import { initFilters } from './filters.js';
import './validate-form.js';
import './handle-form.js';
import './edit-picture.js';
import './form-img-upload.js';

const init = async () => {
  try {
    const photos = await getData();

    renderPictures(photos);
    setPhotos(photos);
    initFilters(photos);
  } catch (error) {
    window.console.error('Ошибка при загрузке данных:', error.message);
    showDataError();
  }
};

init();
