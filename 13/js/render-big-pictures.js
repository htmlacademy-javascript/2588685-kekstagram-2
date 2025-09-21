import { clearComments, renderComments } from './render-comments.js';
import { isEscapeKey } from './utils.js';
import { picturesContainer } from './render-thumbnails.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCancelButton = bigPictureContainer.querySelector('.big-picture__cancel');

let photosData = [];

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  clearComments();

  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelButton.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

const setPhotos = (photos) => {
  photosData = photos;
};

const openBigPicture = (pictureId) => {
  const currentPhoto = photosData.find((photo) => photo.id === Number(pictureId));

  if (!currentPhoto) {
    return;
  }

  bigPictureContainer.querySelector('.big-picture__img img').src = currentPhoto.url;
  bigPictureContainer.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancelButton.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.id);
  }
});

export { openBigPicture, setPhotos };
